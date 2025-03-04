import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { XMLBuilder } from "fast-xml-parser";
import { Hono } from "hono";
import { toSSG } from "hono/ssg";
import { type BuildNoteOptions, buildChannel } from "./builder";

const FIREFOX_CHANNELS = ["Release", "Beta", "Nightly"] as const;
const FIREFOX_PRODUCTS: Omit<BuildNoteOptions, "channel">[] = [
	{
		product: "Firefox",
		dir: "/",
		releaseNoteUrl:
			"https://www.mozilla.org/en-US/firefox/{version}/releasenotes/",
	},
	{
		product: "Firefox for Android",
		dir: "/android/",
		releaseNoteUrl:
			"https://www.mozilla.org/en-US/firefox/android/{version}/releasenotes/",
	},
	{
		product: "Firefox for iOS",
		dir: "/ios/",
		releaseNoteUrl:
			"https://www.mozilla.org/en-US/firefox/ios/{version}/releasenotes/",
	},
] as const;

const builder = new XMLBuilder({
	ignoreAttributes: false,
	suppressEmptyNode: true,
	suppressBooleanAttributes: false,
	format: process.env.NODE_ENV === "development",
});

const app = new Hono();

for (const channeName of FIREFOX_CHANNELS) {
	for (const product of FIREFOX_PRODUCTS) {
		app.get(`${product.dir}${channeName.toLowerCase()}.xml`, async (c) => {
			const channel = await buildChannel({ channel: channeName, ...product });

			if (!channel.item || channel.item.length === 0) {
				return c.notFound();
			}

			const rss = builder.build({
				"?xml": {
					"@_version": "1.0",
					"@_encoding": "UTF-8",
				},
				rss: {
					"@_version": "2.0",
					channel,
				},
			});

			return c.body(rss, 200, {
				"Content-Type": "application/xml",
			});
		});
	}
}

toSSG(app, fs, {
	dir: fileURLToPath(new URL("../dist", import.meta.url)),
	afterResponseHook(res) {
		return res.status === 200 ? res : false;
	},
});

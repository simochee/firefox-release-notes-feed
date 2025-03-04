import { mkdir, writeFile } from "node:fs/promises";
import { XMLBuilder } from "fast-xml-parser";
import { type BuildNoteOptions, buildChannel } from "./builder";

const FIREFOX_CHANNELS = ["Release", "Beta", "Nightly"] as const;
const FIREFOX_PRODUCTS: Omit<BuildNoteOptions, "channel">[] = [
	{
		product: "Firefox",
		dir: "./",
		releaseNoteUrl:
			"https://www.mozilla.org/en-US/firefox/{version}/releasenotes/",
	},
	{
		product: "Firefox for Android",
		dir: "./android/",
		releaseNoteUrl:
			"https://www.mozilla.org/en-US/firefox/android/{version}/releasenotes/",
	},
	{
		product: "Firefox for iOS",
		dir: "./ios/",
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

await Promise.all(
	FIREFOX_CHANNELS.map(async (channel) =>
		FIREFOX_PRODUCTS.map(async (product) => {
			const rss = builder.build({
				"?xml": {
					"@_version": "1.0",
					"@_encoding": "UTF-8",
				},
				rss: {
					"@_version": "2.0",
					channel: await buildChannel({ channel, ...product }),
				},
			});

			const dist = new URL("../dist/", import.meta.url);
			const feed = new URL(product.dir, dist);

			await mkdir(feed, { recursive: true });
			await writeFile(new URL(`${channel.toLowerCase()}.xml`, feed), rss);
		}),
	),
);

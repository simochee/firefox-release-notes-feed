import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Hono } from "hono";
import { toSSG } from "hono/ssg";
import { FIREFOX_CONFIG } from "./config";
import { buildRSS } from "./rss";

const app = new Hono();

for (const { product, channels } of FIREFOX_CONFIG) {
	for (const channel of channels) {
		app.get(`/${channel.file}`, async (c) => {
			const rss = await buildRSS(product, channel);

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

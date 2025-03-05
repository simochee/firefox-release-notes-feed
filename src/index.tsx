import { Hono } from "hono";
import { FeedList } from "./FeedList";
import { build } from "./build";
import { FIREFOX_CONFIG } from "./config";
import { buildRSS } from "./rss";

const app = new Hono();

app.get("/", (c) => c.html(<FeedList />));

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

await build(app);

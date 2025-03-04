import { mkdir, writeFile } from "node:fs/promises";
import { XMLBuilder } from "fast-xml-parser";
import { buildChannel } from "./biulder.js";

const RELEASE_CHANNELS = ["Release", "Beta", "Nightly"] as const;

const builder = new XMLBuilder({
	ignoreAttributes: false,
	suppressEmptyNode: true,
	suppressBooleanAttributes: false,
	format: process.env.NODE_ENV === "development",
});

await Promise.all(
	RELEASE_CHANNELS.map(async (channel) => {
		const rss = builder.build({
			"?xml": {
				"@_version": "1.0",
				"@_encoding": "UTF-8",
			},
			rss: {
				"@_version": "2.0",
				channel: await buildChannel({ channel }),
			},
		});

		const dist = new URL("../dist/", import.meta.url);
		const feed = new URL("./feed/", dist);

		await mkdir(feed, { recursive: true });
		await writeFile(new URL(`${channel.toLowerCase()}.xml`, feed), rss);

		if (channel === "Release") {
			await writeFile(new URL("feed.xml", dist), rss);
		}
	}),
);

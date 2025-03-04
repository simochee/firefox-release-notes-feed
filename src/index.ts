import { mkdir, writeFile } from "node:fs/promises";
import { XMLBuilder } from "fast-xml-parser";
import { type BuildNoteOptions, buildChannel } from "./builder";

const BUILD_OPTIONS = [
	{ channel: "Release" },
	{ channel: "Beta" },
	{ channel: "Nightly" },
] satisfies BuildNoteOptions[];

const builder = new XMLBuilder({
	ignoreAttributes: false,
	suppressEmptyNode: true,
	suppressBooleanAttributes: false,
	format: process.env.NODE_ENV === "development",
});

await Promise.all(
	BUILD_OPTIONS.map(async (option) => {
		const rss = builder.build({
			"?xml": {
				"@_version": "1.0",
				"@_encoding": "UTF-8",
			},
			rss: {
				"@_version": "2.0",
				channel: await buildChannel(option),
			},
		});

		const dist = new URL("../dist/", import.meta.url);
		const feed = new URL("./feed/", dist);

		await mkdir(feed, { recursive: true });
		await writeFile(new URL(`${option.channel.toLowerCase()}.xml`, feed), rss);

		if (option.channel === "Release") {
			await writeFile(new URL("feed.xml", dist), rss);
		}
	}),
);

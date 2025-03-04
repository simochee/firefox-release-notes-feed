import { mkdir, writeFile } from "node:fs/promises";
import { XMLBuilder } from "fast-xml-parser";

const builder = new XMLBuilder({
	ignoreAttributes: false,
	suppressEmptyNode: true,
	suppressBooleanAttributes: false,
});

const rss = builder.build({
	"?xml": {
		"@_version": "1.0",
		"@_encoding": "UTF-8",
	},
	rss: {
		channel: {},
	},
});

const dist = new URL("../dist/", import.meta.url);

await mkdir(dist, { recursive: true });
await writeFile(new URL("feed.xml", dist), rss);

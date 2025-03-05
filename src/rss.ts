import { XMLBuilder } from "fast-xml-parser";
import type { ConfigChannel } from "./config";
import { formatRFC822 } from "./date";
import { buildReleaseNotes } from "./release-notes";

const builder = new XMLBuilder({
	ignoreAttributes: false,
	suppressEmptyNode: true,
	suppressBooleanAttributes: false,
	format: true,
});

export const buildRSS = async (
	product: string,
	channel: ConfigChannel,
): Promise<string> => {
	const { pubDate, item } = await buildReleaseNotes(product, channel);

	return builder.build({
		"?xml": {
			"@_version": "1.0",
			"@_encoding": "UTF-8",
		},
		rss: {
			"@_version": "2.0",
			channel: {
				title: channel.title,
				link: channel.link,
				description: channel.description,
				lastBuildDate: formatRFC822(new Date()),
				pubDate: formatRFC822(pubDate),
				language: "en-US",
				generator: "Hono",
				ttl: 3 * 60 * 60 * 1000,
				item,
			},
		},
	});
};

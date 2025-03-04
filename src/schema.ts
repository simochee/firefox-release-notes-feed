import * as v from "valibot";
import { formatRFC822 } from "./date";

export const rssSchema = v.object({
	title: v.string(),
	link: v.pipe(v.string(), v.url()),
	description: v.string(),
	language: v.optional(v.string()),
	lastBuildDate: v.optional(v.pipe(v.date(), v.transform(formatRFC822))),
	pubDate: v.optional(v.pipe(v.date(), v.transform(formatRFC822))),
	ttl: v.optional(v.number()),
	image: v.optional(
		v.object({
			url: v.pipe(v.string(), v.url()),
			title: v.string(),
			link: v.pipe(v.string(), v.url()),
			width: v.optional(v.number()),
			height: v.optional(v.number()),
			description: v.optional(v.string()),
		}),
	),
	item: v.optional(
		v.array(
			v.object({
				title: v.optional(v.string()),
				link: v.optional(v.pipe(v.string(), v.url())),
				pubDate: v.optional(v.pipe(v.date(), v.transform(formatRFC822))),
				guid: v.optional(
					v.object({
						"@_isPermaLink": v.string(),
						"#text": v.string(),
					}),
				),
				description: v.optional(v.string()),
				content: v.optional(v.string()),
			}),
		),
	),
});

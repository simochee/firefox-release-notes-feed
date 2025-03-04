import * as v from "valibot";
import { formatRFC822 } from "./date";

export const rssSchema = v.object({
	title: v.string(),
	link: v.pipe(v.string(), v.url()),
	description: v.string(),
	language: v.optional(v.string()),
	lastBuildDate: v.optional(v.pipe(v.date(), v.transform(formatRFC822))),
	pubDate: v.optional(v.pipe(v.date(), v.transform(formatRFC822))),
});

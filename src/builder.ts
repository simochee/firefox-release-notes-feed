import * as v from "valibot";
import { rssSchema } from "./schema";

export type BuildNoteOptions = {
	channel: "Release" | "Beta" | "Nightly";
};

export const buildChannel = async (
	options: BuildNoteOptions,
): Promise<v.InferOutput<typeof rssSchema>> => {
	return v.parse(rssSchema, {
		title: "Mozilla Firefox Release Notes",
		description: `Mozilla Firefox ${options.channel} Release Notes`,
		link: "https://www.mozilla.org/en-US/firefox/notes/",
		language: "en-US",
		lastBuildDate: new Date(),
		pubDate: new Date(),
		ttl: 3 * 60 * 60 * 1000,
	} satisfies v.InferInput<typeof rssSchema>);
};

import * as v from "valibot";
import { getReleaseNote } from "./release-note";
import { rssSchema } from "./schema";

export type BuildNoteOptions = {
	dir: string;
	channel: string;
	product: string;
	releaseNoteUrl: string;
};

export const buildChannel = async (
	options: BuildNoteOptions,
): Promise<v.InferOutput<typeof rssSchema>> => {
	const releaseNote = await getReleaseNote(options.channel, options.product);
	const releaseDate = Math.max(
		...releaseNote.map((note) => new Date(note.release_date).getTime()),
	);

	return v.parse(rssSchema, {
		title: "Mozilla Firefox Release Notes",
		description: `Mozilla Firefox ${options.channel} Release Notes`,
		link: "https://www.mozilla.org/en-US/firefox/notes/",
		language: "en-US",
		lastBuildDate: new Date(),
		pubDate: Number.isFinite(releaseDate) ? new Date(releaseDate) : undefined,
		ttl: 3 * 60 * 60 * 1000,
		item: releaseNote.map((note) => ({
			title: note.title,
			link: options.releaseNoteUrl.replaceAll("{version}", note.version),
			guid: {
				"@_isPermaLink": "false",
				"#text": note.slug,
			},
			pubDate: note.release_date ? new Date(note.release_date) : undefined,
		})),
	} satisfies v.InferInput<typeof rssSchema>);
};

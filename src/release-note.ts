import { readFile, readdir } from "node:fs/promises";

type ReleaseNote = {
	bug_list: string;
	bug_search_url: string;
	channel: string;
	created: string;
	is_public: boolean;
	modified: string;
	notes: {
		bug: number;
		created: string;
		id: number;
		is_public: boolean;
		modified: string;
		note: string;
		progressive_rollout: boolean;
		relevant_countries: string[];
		sort_num: number;
		tag: string;
	}[];
	product: string;
	release_date: string;
	slug: string;
	system_requirements: string;
	text: string;
	title: string;
	version: string;
};

const dir = new URL("../release-notes/releases/", import.meta.url);

export const getReleaseNote = async (channel: string, product: string) => {
	const files = await readdir(dir);
	const releaseNotes = await Promise.all(
		files
			.filter((filePath) => filePath.endsWith(".json"))
			.map(async (filePath) => {
				return JSON.parse(await readFile(new URL(filePath, dir), "utf-8"));
			}),
	);
	const channelReleaseNotes = releaseNotes
		.filter((releaseNote) => releaseNote.is_public)
		.filter((releaseNote) => releaseNote.product === product)
		.filter((releaseNote) => releaseNote.channel === channel);

	return channelReleaseNotes as ReleaseNote[];
};

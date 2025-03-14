import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import glob from "fast-glob";
import type { ConfigChannel } from "./config";
import { formatDate, formatRFC822 } from "./date";
const RELEASE_NOTES_DIR = new URL(
	"../release-notes/releases/",
	import.meta.url,
);

const getAllReleaseNotes = async () => {
	const files = await glob("firefox-*.json", {
		cwd: fileURLToPath(new URL("../release-notes/releases/", import.meta.url)),
	});

	return await Promise.all(
		files.map(async (file) =>
			JSON.parse(await readFile(new URL(file, RELEASE_NOTES_DIR), "utf-8")),
		),
	);
};

const releaseNotesPromise = getAllReleaseNotes();

export const buildReleaseNotes = async (
	product: string,
	config: ConfigChannel,
) => {
	const releaseNotes = await releaseNotesPromise;
	const items = releaseNotes
		.filter(
			(note) =>
				note.is_public &&
				note.product === product &&
				note.channel === config.channel,
		)
		.sort(
			(a, b) =>
				new Date(b.release_date).getTime() - new Date(a.release_date).getTime(),
		)
		.slice(0, 20);

	const latestReleaseDate = Math.max(
		...items.map((item) => new Date(item.release_date).getTime()),
	);
	const pubDate = new Date(latestReleaseDate);

	const item = items.map((note) => ({
		title: note.title,
		description: `Version ${note.version}, first offered to ${config.channel} channel users on ${formatDate(new Date(note.release_date))}`,
		link: config.versionLink.replace("{version}", note.version),
		guid: {
			"@_isPermaLink": "false",
			"#text": note.slug,
		},
		pubDate: formatRFC822(new Date(note.release_date)),
		"media:thumbnail": {
			"@_url": config.thumbnail,
			"@_width": "960",
			"@_height": "540",
		},
	}));

	return { pubDate, item };
};

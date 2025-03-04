type BuildNoteOptions = {
	channel: "Release" | "Beta" | "Nightly";
};

type BuildNoteResult = {
	title: string;
};

export const buildChannel = async (
	options: BuildNoteOptions,
): Promise<BuildNoteResult> => {
	return {
		title: "Mozilla Firefox Release Notes",
	};
};

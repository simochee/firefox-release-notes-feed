type Config = {
	product: string;
	channels: ConfigChannel[];
};

export type ReleaseChannel = "Release" | "Beta" | "Nightly";

export type ConfigChannel = {
	channel: ReleaseChannel;
	title: string;
	description: string;
	file: `${string}.xml`;
	link: string;
	versionLink: string;
	thumbnail: string;
};

export const FIREFOX_CONFIG: Config[] = [
	{
		product: "Firefox",
		channels: [
			{
				channel: "Release",
				title: "Firefox",
				description: "Firefox Desktop Release Notes",
				file: "release.xml",
				link: "https://www.mozilla.org/en-US/firefox/notes/",
				versionLink:
					"https://www.mozilla.org/en-US/firefox/{version}/releasenotes/",
				thumbnail:
					"https://firefox-release-notes.simochee.net/thumbnails/firefox-browser.png",
			},
			{
				channel: "Beta",
				title: "Firefox Beta & Developer Edition",
				description: "Firefox Desktop Beta & Developer Edition Release Notes",
				file: "beta.xml",
				link: "https://www.mozilla.org/en-US/firefox/beta/notes/",
				versionLink:
					"https://www.mozilla.org/en-US/firefox/{version}/releasenotes/",
				thumbnail:
					"https://firefox-release-notes.simochee.net/thumbnails/firefox-beta.png",
			},
			{
				channel: "Nightly",
				title: "Firefox Nightly",
				description: "Firefox Desktop Nightly Release Notes",
				file: "nightly.xml",
				link: "https://www.mozilla.org/en-US/firefox/nightly/notes/",
				versionLink:
					"https://www.mozilla.org/en-US/firefox/{version}/releasenotes/",
				thumbnail:
					"https://firefox-release-notes.simochee.net/thumbnails/firefox-nightly.png",
			},
		],
	},
	{
		product: "Firefox for Android",
		channels: [
			{
				channel: "Release",
				title: "Firefox for Android",
				description: "Firefox for Android Release Notes",
				file: "android.xml",
				link: "https://www.mozilla.org/en-US/firefox/android/notes/",
				versionLink:
					"https://www.mozilla.org/en-US/firefox/android/{version}/releasenotes/",
				thumbnail:
					"https://firefox-release-notes.simochee.net/thumbnails/firefox-android.png",
			},
		],
	},
	{
		product: "Firefox for iOS",
		channels: [
			{
				channel: "Release",
				title: "Firefox for iOS",
				description: "Firefox for iOS Release Notes",
				file: "ios.xml",
				link: "https://www.mozilla.org/en-US/firefox/ios/notes/",
				versionLink:
					"https://www.mozilla.org/en-US/firefox/ios/{version}/releasenotes/",
				thumbnail:
					"https://firefox-release-notes.simochee.net/thumbnails/firefox-ios.png",
			},
		],
	},
];

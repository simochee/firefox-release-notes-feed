import { Fragment } from "hono/jsx";
import { FIREFOX_CONFIG } from "./config";

export const FeedList = async () => {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="color-scheme" content="light dark" />
				<title>Firefox Release Notes Feeds</title>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
				/>
			</head>
			<body>
				<main className="container">
					<h1>Firefox Release Notes Feeds</h1>
					{FIREFOX_CONFIG.map(({ product, channels }) => (
						<Fragment key={product}>
							<h2>{product}</h2>
							{channels.map(({ channel, file, link }) => (
								<Fragment key={channel}>
									<h3>{channel} Channel</h3>
									<ul>
										<li>
											<a href={`/${file}`}>
												https://firefox-release-notes.simochee.net/{file}
											</a>
										</li>
										<li>
											<a href={link}>{link}</a>
										</li>
									</ul>
								</Fragment>
							))}
						</Fragment>
					))}
				</main>
			</body>
		</html>
	);
};

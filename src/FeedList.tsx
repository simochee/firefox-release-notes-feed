import { FIREFOX_CONFIG } from "./config";

export const FeedList = async () => {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="color-scheme" content="light dark" />
				<title>Firefox Release Notes RSS Feeds</title>
				<meta
					name="description"
					content="RSS feeds for Firefox release notes across all channels and products"
				/>
				<link
					rel="icon"
					type="image/svg+xml"
					href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23ff6600' d='M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-3.791-7.209c-3.905-3.905-10.237-3.905-14.142 0s-3.905 10.237 0 14.142 10.237 3.905 14.142 0 3.905-10.237 0-14.142z'/%3E%3C/svg%3E"
				/>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
				/>
				<style>{`
					.hero {
						text-align: center;
						padding: 2rem 0;
						background: linear-gradient(135deg, #ff6600 0%, #ff9900 100%);
						color: white;
						border-radius: 0.5rem;
						margin-bottom: 2rem;
					}
					.hero h1 {
						margin: 0;
						font-size: 2.5rem;
						font-weight: bold;
					}
					.hero p {
						margin: 0.5rem 0 0 0;
						opacity: 0.9;
					}
					.badge-container {
						display: flex;
						gap: 0.5rem;
						justify-content: center;
						flex-wrap: wrap;
						margin: 1rem 0 2rem 0;
					}
					.feed-grid {
						display: grid;
						grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
						gap: 1.5rem;
						margin: 2rem 0;
					}
					.product-card {
						background: var(--pico-card-background-color);
						border: 1px solid var(--pico-border-color);
						border-radius: 0.5rem;
						padding: 1.5rem;
						box-shadow: 0 2px 4px rgba(0,0,0,0.1);
					}
					.product-title {
						display: flex;
						align-items: center;
						gap: 0.5rem;
						margin-bottom: 1rem;
					}
					.product-icon {
						width: 32px;
						height: 32px;
					}
					.channel-item {
						border: 1px solid var(--pico-border-color);
						border-radius: 0.25rem;
						padding: 1rem;
						margin-bottom: 1rem;
						background: var(--pico-background-color);
					}
					.channel-header {
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 0.5rem;
					}
					.channel-name {
						font-weight: bold;
						margin: 0;
					}
					.channel-badge {
						font-size: 0.75rem;
						padding: 0.25rem 0.5rem;
						border-radius: 0.25rem;
						background: var(--pico-primary-background);
						color: var(--pico-primary-inverse);
					}
					.feed-links {
						display: flex;
						gap: 0.5rem;
						flex-wrap: wrap;
					}
					.feed-link {
						display: inline-flex;
						align-items: center;
						gap: 0.25rem;
						padding: 0.5rem 0.75rem;
						background: var(--pico-secondary-background);
						color: var(--pico-secondary-inverse);
						text-decoration: none;
						border-radius: 0.25rem;
						font-size: 0.875rem;
						transition: opacity 0.2s;
					}
					.feed-link:hover {
						opacity: 0.8;
					}
					.rss-icon {
						width: 16px;
						height: 16px;
					}
					.footer {
						text-align: center;
						padding: 2rem 0;
						border-top: 1px solid var(--pico-border-color);
						margin-top: 3rem;
						color: var(--pico-muted-color);
					}
				`}</style>
			</head>
			<body>
				<main className="container">
					<div className="hero">
						<h1>🦊 Firefox Release Notes RSS Feeds</h1>
						<p>
							Stay updated with the latest Firefox releases across all channels
						</p>
					</div>

					<div className="badge-container">
						<a
							href="https://github.com/simochee/firefox-release-notes-feed"
							target="_blank"
							rel="noreferrer"
						>
							<img
								src="https://img.shields.io/badge/Repository-simochee%2Ffirefox--release--notes--feed-blue?logo=github&logoColor=fff&style=flat-square"
								alt="GitHub Repository"
							/>
						</a>
						<a
							href="https://github.com/simochee/firefox-release-notes-feed/actions/workflows/release.yaml"
							target="_blank"
							rel="noreferrer"
						>
							<img
								src="https://img.shields.io/github/actions/workflow/status/simochee/firefox-release-notes-feed/release.yaml?logo=github-actions&logoColor=fff&label=Build&style=flat-square"
								alt="Build Status"
							/>
						</a>
						<img
							src="https://img.shields.io/badge/RSS-2.0-orange?logo=rss&logoColor=fff&style=flat-square"
							alt="RSS 2.0"
						/>
						<img
							src="https://img.shields.io/badge/Updated-Daily-green?logo=clockify&logoColor=fff&style=flat-square"
							alt="Updated Daily"
						/>
					</div>

					<div className="feed-grid">
						{FIREFOX_CONFIG.map(({ product, channels }) => (
							<div key={product} className="product-card">
								<div className="product-title">
									<svg
										className="product-icon"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<title>{product} icon</title>
										<path d="M23.743 12.003c0-.031-.006-.06-.006-.09 0-6.628-5.373-12-12-12S-.006 5.285-.006 11.913c0 .03.006.059.006.09 0 6.627 5.373 12 12 12s12-5.373 12-12zM2.743 11.913c0-5.523 4.477-10 10-10s10 4.477 10 10v.09c0 5.523-4.477 10-10 10s-10-4.477-10-10v-.09z" />
										<path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z" />
									</svg>
									<h2 style={{ margin: 0 }}>{product}</h2>
								</div>
								{channels.map(({ channel, file, link }) => (
									<div key={channel} className="channel-item">
										<div className="channel-header">
											<h3 className="channel-name">{channel}</h3>
											<span className="channel-badge">
												{channel.toLowerCase()}
											</span>
										</div>
										<div className="feed-links">
											<a href={`/${file}`} className="feed-link">
												<svg
													className="rss-icon"
													viewBox="0 0 24 24"
													fill="currentColor"
												>
													<title>RSS icon</title>
													<path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248S0 22.546 0 20.752s1.456-3.248 3.252-3.248 3.251 1.454 3.251 3.248zM1.677 6.155v4.301c5.493 0 9.942 4.448 9.942 9.94h4.299c0-7.837-6.404-14.241-14.241-14.241zM1.677.014v4.301C9.514 4.315 15.918 10.719 15.918 18.556H20.22C20.22 8.977 12.26.014 1.677.014z" />
												</svg>
												RSS Feed
											</a>
											<a
												href={link}
												target="_blank"
												rel="noreferrer"
												className="feed-link"
											>
												<svg
													className="rss-icon"
													viewBox="0 0 24 24"
													fill="currentColor"
												>
													<title>External link icon</title>
													<path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
												</svg>
												Source
											</a>
										</div>
									</div>
								))}
							</div>
						))}
					</div>

					<div className="footer">
						<p>
							Powered by{" "}
							<a href="https://hono.dev" target="_blank" rel="noreferrer">
								Hono
							</a>{" "}
							• Hosted on{" "}
							<a
								href="https://pages.cloudflare.com"
								target="_blank"
								rel="noreferrer"
							>
								Cloudflare Pages
							</a>{" "}
							• Made with ❤️ by{" "}
							<a
								href="https://github.com/simochee"
								target="_blank"
								rel="noreferrer"
							>
								@simochee
							</a>
						</p>
					</div>
				</main>
			</body>
		</html>
	);
};

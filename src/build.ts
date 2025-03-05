import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type { Hono } from "hono";
import { toSSG } from "hono/ssg";

export const build = async (app: Hono) => {
	const distDir = new URL("../dist", import.meta.url);
	const publicDir = new URL("../public", import.meta.url);

	// dist/ をクリーンアップ
	await fs.rm(distDir, { recursive: true });

	// public/ を dist/ にコピー
	await fs.cp(publicDir, distDir, { recursive: true });

	// Hono のエンドポイントをビルド
	await toSSG(app, fs, {
		dir: fileURLToPath(distDir),
		afterResponseHook(res) {
			return res.status === 200 ? res : false;
		},
	});
};

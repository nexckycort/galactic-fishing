import { defineConfig } from "@rsbuild/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginSolid } from "@rsbuild/plugin-solid";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";
import { GenerateSW } from "@aaroon/workbox-rspack-plugin";

export default defineConfig({
	plugins: [
		pluginBabel({
			include: /\.(?:jsx|tsx)$/,
		}),
		pluginSolid(),
	],
	html: {
		title: "Galactic Fishing",
	},
	tools: {
		rspack: {
			plugins: [
				new GenerateSW({
					swDest: "service-worker.js",
					clientsClaim: true,
					skipWaiting: true,
					maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
					navigateFallback: "/index.html",
					runtimeCaching: [
						{
							urlPattern:
								/^https:\/\/api-game\.bloque\.app\/game\/leaderboard$/,
							handler: "NetworkFirst",
							options: {
								cacheName: "leaderboard-cache",
								expiration: {
									maxEntries: 10,
									maxAgeSeconds: 60 * 10, // 5 minutos
								},
							},
						},
						{
							urlPattern: /^https:\/\/api-game\.bloque\.app\/game\/market$/,
							handler: "NetworkFirst",
							options: {
								cacheName: "market-cache",
								expiration: {
									maxEntries: 10,
									maxAgeSeconds: 60 * 10, // 10 minutos
								},
							},
						},
					],
				}),
				// @ts-expect-error
				import.meta.env.RSDOCTOR && new RsdoctorRspackPlugin(),
			].filter(Boolean),
		},
	},
});

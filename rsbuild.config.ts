import { defineConfig } from "@rsbuild/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginSolid } from "@rsbuild/plugin-solid";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";

export default defineConfig({
	plugins: [
		pluginBabel({
			include: /\.(?:jsx|tsx)$/,
		}),
		pluginSolid(),
	],
	tools: {
		rspack: {
			plugins: import.meta.env.RSDOCTOR && [new RsdoctorRspackPlugin({})],
		},
	},
});

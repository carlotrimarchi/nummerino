import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		svgr({
			svgrOptions: {
				dimensions: false,
				plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
				svgoConfig: {
					multipass: true,
					plugins: [
						{
							name: "preset-default",
							params: {
									overrides: { convertPathData: false, removeViewBox: false },
								},
						},
						{ name: "removeAttrs", params: { attrs: "class" } },
					],
				},
			},
		}),
	],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/setupTests.ts",
	},
	build: {
		outDir: "dist/web",
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});

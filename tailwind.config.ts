import withMT from "@material-tailwind/react/utils/withMT";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config = withMT({
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {},
	},
	plugins: [typography],
}) as Config;

export default config;

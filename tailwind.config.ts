import withMT from "@material-tailwind/react/utils/withMT";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./utils/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	plugins: [typography],
};

export default withMT(config);

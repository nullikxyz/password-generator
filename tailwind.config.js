/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				accent: {
					1: "hsl(var(--color-accent1) / <alpha-value>)",
					2: "hsl(var(--color-accent2) / <alpha-value>)",
					3: "hsl(var(--color-accent3) / <alpha-value>)",
					4: "hsl(var(--color-accent4) / <alpha-value>)",
				},
				bgk: "hsl(var(--color-bgk) / <alpha-value>)",
				content: "hsl(var(--color-content) / <alpha-value>)",
			},
		},
	},
	plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				colorPrimary: '#fefefe',
				colorSecondary: '#86868b',

				background: '#060606',
				backgroundPrimary: '#0a0a0a',
				backgroundSecondary: '#0f0f0f',
				backgroundSecondaryHover: '#151515',
				backgroundDisabled: 'rgba(255, 255, 255, 0.3)',

				indigoPrimary: '#6564ec',
				indigoSecondary: '#5022f4',

				borderColorLighter: '#121212',
				borderColor: '#232323',
				borderColorHover: '#343434',
				borderColorActive: '#454545',

				accent: '#0082f5',
				accentDark: '#0072f5',
				accentBackground: 'rgba(0, 114, 245, 0.1)',

				warning: '#f85149',
				warningBackground: 'rgba(248, 81, 73, 0.6)',
				warningBorder: 'rgba(248, 81, 73, 0.65)',

				attention: '#fdba74',
				attentionBackground: 'rgba(251, 146, 60, 0.6)',
				attentionBorder: 'rgba(251, 146, 60, 0.65)',

				success: '#3fb950',
				successBackground: 'rgba(63, 185, 80, 0.6)',
				successBorder: 'rgba(63, 185, 80, 0.65)',

				githubColor: '#24292e',
				gitlabColor: '#6b4fbb',
			},
		},
	},
	plugins: [],
};

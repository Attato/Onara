/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				indigoPrimary: '#6564ec',
				indigoSecondary: '#5022f4',

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

				colorPrimary: 'var(--color-primary)',
				colorPrimaryDark: 'var(--color-primary-dark)',
				colorSecondary: 'var(--color-secondary)',
				colorSecondaryDark: 'var(--color-secondary-dark)',

				backgroundPrimary: 'var(--background-primary)',
				backgroundPrimaryDark: 'var(--background-primary-dark)',
				backgroundSecondary: 'var(--background-secondary)',
				backgroundSecondaryDark: 'var(--background-secondary-dark)',

				borderColor: 'var(--border-color)',
				borderColorDark: 'var(--border-color-dark)',
			},
		},
	},
	plugins: [],
};

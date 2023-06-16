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

				accent: 'var(--accent)',

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

				background: 'var(--background)',
				backgroundDark: 'var(--background-dark)',

				surface100: 'var(--surface-100)',
				surface100Dark: 'var(--surface-100-dark)',
				surface200: 'var(--surface-200)',
				surface200Dark: 'var(--surface-200-dark)',
				surface300: 'var(--surface-300)',
				surface300Dark: 'var(--surface-300-dark)',
				surface400: 'var(--surface-400)',
				surface400Dark: 'var(--surface-400-dark)',

				border: 'var(--border)',
				borderDark: 'var(--border-dark)',
			},
		},
	},
	plugins: [],
};

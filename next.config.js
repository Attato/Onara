const { i18n } = require('./next-i18next.config');

const nextConfig = {
	experimental: {
		appDir: true,
		typedRoutes: true,
	},

	reactStrictMode: true,

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'gitlab.com',
				port: '',
			},
		],
	},

	i18n,
};

module.exports = nextConfig;

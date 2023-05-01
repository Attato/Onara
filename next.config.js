/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: false,
		typedRoutes: true,
	},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
			},
		],
	},
};

module.exports = nextConfig;

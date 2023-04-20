import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		// Providers.GitLab({
		// 	clientId: process.env.GITLAB_CLIENT_ID,
		// 	clientSecret: process.env.GITLAB_CLIENT_SECRET,
		// }),
	],
});

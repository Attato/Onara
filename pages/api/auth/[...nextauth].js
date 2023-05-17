import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GitlabProvider from 'next-auth/providers/gitlab';

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
		}),
		GitlabProvider({
			clientId: process.env.NEXT_PUBLIC_GITLAB_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_GITLAB_CLIENT_SECRET,
		}),
	],
});

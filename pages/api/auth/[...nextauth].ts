import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import prisma from '@/lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

const options = {
	providers: [
		GitHubProvider({
			clientId:
				process.env.NODE_ENV === 'production'
					? process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID_PROD!
					: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID_DEV!,
			clientSecret:
				process.env.NODE_ENV === 'production'
					? process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET_PROD!
					: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET_DEV!,
		}),
	],
	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
};

export default authHandler;

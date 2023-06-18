import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export async function fetchProfileData(session: any) {
	try {
		const profileData: any = await prisma.user.findFirst({
			where: { email: session.user?.email },
		});

		if (!profileData) {
			throw new Error('User not found');
		}

		const config = {
			headers: {
				Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
			},
		};

		const { data: repositories } = await axios.get(
			`https://api.github.com/users/${profileData.name}/repos`,
			config
		);

		profileData.repositories = repositories.map((repo: any) => {
			return {
				id: repo.id.toString(),
				name: repo.name,
				owner: repo.owner.login,
				htmlUrl: repo.html_url,
				description: repo.description,
				createdAt: repo.created_at,
				updatedAt: repo.updated_at,
				gitUrl: repo.git_url,
				sshUrl: repo.ssh_url,
				cloneUrl: repo.clone_url,
				homepage: repo.homepage,
				stargazersCount: repo.stargazers_count,
				watchersCount: repo.watchers_count,
				language: repo.language,
				visibility: repo.visibility,
				userId: profileData.id,
			};
		});

		const { data: followers } = await axios.get(
			`https://api.github.com/users/${profileData.name}/followers`,
			config
		);

		profileData.followers = followers.map((follower: any) => {
			return {
				id: follower.id.toString(),
				login: follower.login,
				image: follower.avatar_url,
				htmlUrl: follower.html_url,
			};
		});

		const { data: following } = await axios.get(
			`https://api.github.com/users/${profileData.name}/following`,
			config
		);

		profileData.following = following.map((following: any) => {
			return {
				id: following.id.toString(),
				login: following.login,
				image: following.avatar_url,
				htmlUrl: following.html_url,
			};
		});

		const { data: friends } = await axios.get(
			`https://api.github.com/users/${profileData.name}/friends`,
			config
		);

		profileData.friends = friends.map((friend: any) => {
			return {
				id: friend.id.toString(),
				login: friend.login,
				image: friend.avatar_url,
				htmlUrl: friend.html_url,
			};
		});

		const { data: user } = await axios.get(
			`https://api.github.com/users/${profileData.name}`,
			config
		);

		profileData.email = user.email;
		profileData.name = user.name;
		profileData.image = user.avatar_url;
		profileData.htmlUrl = user.html_url;
		profileData.bio = user.bio;
		profileData.location = user.location;
		profileData.createdAt = user.created_at;
		profileData.updatedAt = user.updated_at;

		return profileData;
	} catch (error) {
		console.error('Error fetching profile data:', error);
		throw new Error('Error fetching profile data');
	}
}

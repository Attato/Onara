import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useSession, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/outline';
import Sidebar from '@/components/Sidebar';
import styles from './index.module.scss';
import prisma from '@/lib/prisma';

export interface ProfileProps {
	profileData: any;
}

const Profile: NextPage<ProfileProps> = ({ profileData }) => {
	const { status } = useSession();

	console.log(profileData);

	console.log(status);

	return (
		<>
			<Head>
				<title>{profileData?.name}</title>
				<meta
					name="description"
					content="Onara is the perfect way to administer your repositories. Administer your application easily and efficiently."
				/>
				<link rel="icon" href="/icon.svg" />
				<link rel="manifest" href="/manifest.json" />
			</Head>

			{status === 'authenticated' && (
				<div className="bg-backgroundPrimary dark:bg-backgroundPrimaryDark">
					<div className="flex gap-6 max-w-5xl min-h-screen m-auto px-5 pb-5 py-16 text-colorPrimary dark:text-colorPrimaryDark">
						<Sidebar username={profileData?.name} />

						<div className="flex flex-col gap-6 w-full">
							<div className="flex items-center gap-6 bg-backgroundPrimary dark:bg-backgroundPrimaryDark px-8 py-10">
								{profileData && (
									<React.Fragment>
										<Image
											src={`${profileData?.image}`}
											width={150}
											height={150}
											alt="profile image"
											priority={true}
											className="rounded-[50%]"
										/>
										<div className="flex flex-col justify-end h-fit w-full text-colorSecondary dark:text-colorSecondaryDark relative">
											<h1 className="text-2xl font-semibold text-colorPrimary dark:text-colorPrimaryDark">
												{profileData?.name}
											</h1>
											<span className="mt-1 text-sm">{profileData?.bio}</span>
											<div className="flex items-center gap-2 mx-3">
												<div className="flex items-center gap-1 text-sm text-colorSecondary dark:text-colorSecondaryDark">
													<MapPinIcon width={14} height={14} />
													{profileData?.location}
												</div>
											</div>

											<div className="flex items-center gap-1 text-sm absolute top-0 right-0">
												<StarIcon width={16} height={16} />
												{profileData?.starredRepos}
											</div>
										</div>
									</React.Fragment>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: '/',
			},
		};
	}

	const { username } = context.params as { username: string }; // Type assertion

	try {
		const response = await fetch(`https://api.github.com/users/${username}`);
		const profileData = await response.json();

		const fetchTotalStars = async () => {
			try {
				const response = await fetch(
					profileData.starred_url.replace('{/owner}{/repo}', '') + '?per_page=1'
				);
				const data = await response.json();
				return data.length;
			} catch (error) {
				console.error('Error fetching total stars:', error);
				return 0;
			}
		};

		const totalStars = await fetchTotalStars();

		// Save additional values to the User table
		const updatedUser = await prisma.user.upsert({
			where: { email: session.user?.email || '' },
			create: {
				email: session.user?.email || '',
				name: profileData.name,
				image: profileData.avatar_url,
				bio: profileData.bio,
				location: profileData.location,
				followers: profileData.followers,
				following: profileData.following,
				starredRepos: totalStars,
			},
			update: {
				name: profileData.name,
				image: profileData.avatar_url,
				bio: profileData.bio,
				location: profileData.location,
				followers: profileData.followers,
				following: profileData.following,
				starredRepos: totalStars,
			},
		});

		return {
			props: {
				session,
				profileData: updatedUser,
			},
		};
	} catch (error) {
		console.error('Error fetching profile data:', error);
		return {
			props: {
				session,
				profileData: null,
				totalStars: 0,
			},
		};
	}
};

export default Profile;

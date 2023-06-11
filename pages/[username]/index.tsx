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
	totalStars: number;
}

const Profile: NextPage<ProfileProps> = ({ profileData, totalStars }) => {
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
				<div className={styles.profile}>
					<div className={styles.profile_content}>
						<Sidebar username={profileData?.name} />

						<div className={styles.landing}>
							<div className={styles.user_details}>
								{profileData && (
									<React.Fragment>
										<Image
											src={`${profileData?.image}`}
											width={150}
											height={150}
											alt="profile image"
											priority={true}
										/>
										<div className={styles.user_info}>
											<h1 className={styles.username}>{profileData?.name}</h1>
											<span className={styles.description}>
												{profileData?.bio}
											</span>
											<div className={styles.user_info_rows}>
												<div className={styles.row}>
													<MapPinIcon width={14} height={14} />
													{profileData?.location}
												</div>
											</div>

											<div className={styles.total_stars}>
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

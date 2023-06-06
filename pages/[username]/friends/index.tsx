import React, { useState, useEffect } from 'react';

import { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { getSession } from 'next-auth/react';

import { MapPinIcon } from '@heroicons/react/24/outline';

import Sidebar from '@/components/Sidebar';
import Alert from '@/components/Alert';
import Loading from '@/components/Loading';

import styles from './index.module.scss';

const Friends: NextPage<any> = ({ profileData }) => {
	const [profile, setProfile] = useState<any>(profileData);
	const [friends, setFriends] = useState<any[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setProfile(profileData);

		const fetchFriends = async () => {
			try {
				const followersData = await fetch(
					`https://api.github.com/users/${profileData?.login}/followers`
				);
				const followersDataJson = await followersData.json();

				const followingData = await fetch(
					`https://api.github.com/users/${profileData?.login}/following`
				);
				const followingDataJson = await followingData.json();

				const followersWithDetails = await Promise.all(
					followersDataJson.map(async (follower: any) => {
						const response = await fetch(
							`https://api.github.com/users/${follower.login}`
						);
						const followerData = await response.json();
						return followerData;
					})
				);

				const followingWithDetails = await Promise.all(
					followingDataJson.map(async (following: any) => {
						const response = await fetch(
							`https://api.github.com/users/${following.login}`
						);
						const followingData = await response.json();
						return followingData;
					})
				);

				setFriends([...followersWithDetails, ...followingWithDetails]);
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching friends data:', error);
			}
		};

		fetchFriends();
	}, [profileData]);

	const filteredFriends = friends.filter((friend) =>
		friend.login.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const isUserNotFound = filteredFriends.length === 0;

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	return (
		<React.Fragment>
			<Head>
				<title>Your friends</title>
				<meta
					name="description"
					content="Onara is the perfect way to administer your repositories. Administer your application easily and efficiently."
				/>
				<link rel="icon" href="/icon.svg" />
				<link rel="manifest" href="/manifest.json" />
			</Head>

			<div className={styles.friends}>
				<div className={styles.friends_content}>
					<Sidebar username={profile?.name} />

					<div className={styles.friends_list}>
						<div className={styles.friends_find}>
							<input
								type="text"
								placeholder="Find a friend..."
								value={searchQuery}
								onChange={handleSearch}
							/>
							<button>Add friends</button>
						</div>

						{isLoading ? (
							<div className={styles.loading}>
								<Loading />
							</div>
						) : isUserNotFound ? (
							<div className={styles.user_not_found}>
								<Alert text="User Not Found" />
							</div>
						) : (
							<React.Fragment>
								{filteredFriends.map((friend: any) => (
									<div key={friend.id} className={styles.friend}>
										<Link
											href={friend.html_url}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Image
												src={friend.avatar_url}
												width={80}
												height={80}
												alt={friend.login}
											/>

											<div className={styles.friend_info}>
												<span className={styles.login}>{friend.login}</span>
												{friend.bio ? (
													<span>{friend.bio}</span>
												) : (
													<span>...</span>
												)}

												<span className={styles.location}>
													<MapPinIcon width={16} height={16} />
													{friend.location ? (
														<span>{friend.location}</span>
													) : (
														<span>Unknown location</span>
													)}
												</span>
											</div>
										</Link>
									</div>
								))}
							</React.Fragment>
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
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

	const { username } = context.params as { username: string };

	try {
		const response = await fetch(`https://api.github.com/users/${username}`);
		const profileData = await response.json();

		return {
			props: {
				session,
				profileData,
			},
		};
	} catch (error) {
		console.error('Error fetching profile data:', error);
		return {
			props: {
				session,
				profileData: null,
			},
		};
	}
};

export default Friends;

import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { useSession, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';

import { MapPinIcon, StarIcon } from '@heroicons/react/24/outline';

import Alert from '@/components/Alert';
import Sidebar from '@/components/Sidebar';

import styles from './index.module.scss';

export interface ProfileProps {
	profileData: any;
}

const Profile: NextPage<ProfileProps> = ({ profileData }) => {
	const { status } = useSession();
	const [profile, setProfile] = useState<any>(profileData);
	const [totalStars, setTotalStars] = useState<number>(0);

	console.log(profile);

	useEffect(() => {
		if (profileData) {
			const fetchTotalStars = async () => {
				try {
					const response = await fetch(
						profileData.starred_url.replace('{/owner}{/repo}', '') +
							'?per_page=1'
					);
					const data = await response.json();
					setTotalStars(data.length);
				} catch (error) {
					console.error('Error fetching total stars:', error);
				}
			};

			fetchTotalStars();
		}
	}, [profileData]);

	return (
		<>
			<Head>
				<title>{profile?.name}</title>
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
						<Sidebar username={profile?.name} />

						<div className={styles.landing}>
							<div className={styles.user_details}>
								{!profile && (
									<Alert text="You have exceeded the traffic limit, you will have to wait an hour." />
								)}

								{profile.message !== undefined && (
									<React.Fragment>
										<div className={styles.api_limit}>
											<Alert text={`${profile.message}`} />
											<Link href={profile.documentation_url} target="_blank">
												GitHub documentation.
											</Link>
										</div>
									</React.Fragment>
								)}

								{profile && profile.message === undefined && (
									<React.Fragment>
										<Image
											src={`${profile?.avatar_url}`}
											width={150}
											height={150}
											alt="profile image"
											priority={true}
										/>
										<div className={styles.user_info}>
											<h1 className={styles.username}>{profile?.name}</h1>
											<span className={styles.description}>{profile?.bio}</span>
											<div className={styles.user_info_rows}>
												<div className={styles.row}>
													<MapPinIcon width={14} height={14} />
													{profile?.location}
												</div>
											</div>

											<div className={styles.total_stars}>
												<StarIcon width={16} height={16} />
												{totalStars}
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

export default Profile;

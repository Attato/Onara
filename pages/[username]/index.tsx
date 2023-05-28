import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { useSession, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';

import {
	MapPinIcon,
	UsersIcon,
	ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { links } from '@/data/pages/profile/links';

import styles from './index.module.scss';

interface ProfileProps {
	profileData: any;
	languageUsage: LanguageUsage[];
}

interface LanguageUsage {
	language: string;
	count: number;
	percentage: number;
}

interface Repo {
	language: string;
}

const Profile: NextPage<ProfileProps> = ({ profileData, languageUsage }) => {
	const { status } = useSession();
	const [profile, setProfile] = useState(profileData);

	useEffect(() => {
		setProfile(profileData);
	}, [profileData]);

	return (
		<>
			<Head>
				<title>Onara</title>
				<meta
					name="description"
					content="Onara is the perfect way to administer your repositories. Administer your application easily and efficiently."
				/>
				<link rel="icon" href="/icon.svg" />
			</Head>

			{status === 'authenticated' && (
				<div className={styles.profile}>
					<div className={styles.profile_content}>
						<div className={styles.profile_sidebar}>
							{links.map((link) => (
								<Link href={link.href} className={styles.link} key={link.label}>
									{link.label}
									{link.image}
								</Link>
							))}
						</div>
						<div className={styles.landing}>
							<div className={styles.user_details}>
								<Image
									src={`${profile?.avatar_url}`}
									width={150}
									height={150}
									alt="profile image"
									priority={true}
								/>
								<div className={styles.user_info}>
									<h1>{profile?.name}</h1>
									<span className={styles.description}>{profile.bio}</span>
									<div className={styles.user_info_rows}>
										<div className={styles.row}>
											<MapPinIcon width={16} height={16} />
											{profile.location}
										</div>
										<div className={styles.row}>
											<UsersIcon width={16} height={16} />
											<Link href={profile.followers_url}>
												{profile.followers} followers
											</Link>
											<Link href={profile.following_url}>
												{profile.following} following
											</Link>
										</div>
									</div>
									<Link
										className={styles.github_link}
										href={profile.html_url}
										target="_blank"
									>
										Go to GitHub profile
										<ArrowTopRightOnSquareIcon width={14} height={14} />
									</Link>
								</div>
							</div>

							<div className={styles.languages}>
								<h2>Most Used Languages:</h2>
								<ul>
									{languageUsage.map((language) => (
										<li key={language.language}>
											{language.language}: {language.count} (
											{language.percentage.toFixed(2)}%)
											<div
												className={styles.value}
												style={{ width: `${language.percentage.toFixed(2)}%` }}
											></div>
										</li>
									))}
								</ul>
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
		// Fetch profile information, most used languages, and activity using the GitHub API
		const response = await fetch(`https://api.github.com/users/${username}`);
		const profileData = await response.json();

		const reposResponse = await fetch(profileData.repos_url);
		const reposData: Repo[] = await reposResponse.json();

		const totalRepoCount = reposData.length;

		const languageCount: { [key: string]: number } = {};

		reposData.forEach((repo) => {
			const { language } = repo;

			if (language) {
				if (languageCount[language]) {
					languageCount[language] += 1;
				} else {
					languageCount[language] = 1;
				}
			}
		});

		const sortedLanguages = Object.entries(languageCount)
			.map(([language, count]) => ({
				language,
				count,
				percentage: (count / totalRepoCount) * 100,
			}))
			.sort((a, b) => b.count - a.count);

		return {
			props: {
				session,
				profileData,
				languageUsage: sortedLanguages,
			},
		};
	} catch (error) {
		console.error('Error fetching profile data:', error);
		return {
			props: {
				session,
				profileData: null,
				languageUsage: [],
			},
		};
	}
};

export default Profile;

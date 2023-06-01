import React, { useState, useEffect } from 'react';
import { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import { getSession } from 'next-auth/react';

import { ProfileProps } from '..';
import Sidebar from '@/components/Sidebar';

import styles from './index.module.scss';

const Friends: NextPage<ProfileProps> = ({ profileData }) => {
	const [profile, setProfile] = useState<any>(profileData);

	useEffect(() => {
		setProfile(profileData);
	}, [profileData]);

	return (
		<React.Fragment>
			<Head>
				<title>Your friends</title>
				<meta
					name="description"
					content="Onara is the perfect way to administer your repositories. Administer your application easily and efficiently."
				/>
				<link rel="icon" href="/icon.svg" />
			</Head>
			<div className={styles.friends}>
				<div className={styles.friends_content}>
					<Sidebar username={profile?.name} />
					<h1>Friends</h1>
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

export default Friends;

import React, { useState, useEffect } from 'react';
import { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import { getSession } from 'next-auth/react';

import { ProfileProps } from '..';
import Sidebar from '@/components/Sidebar';
import Alert from '@/components/Alert';

import styles from './index.module.scss';

const Groups: NextPage<ProfileProps> = ({ profileData }) => {
	const [profile, setProfile] = useState<any>(profileData);
	const [groupName, setGroupName] = useState('');
	const [friends, setFriends] = useState<string[]>([]);
	const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
	const [groups, setGroups] = useState<any[]>([]);

	useEffect(() => {
		setProfile(profileData);
	}, [profileData]);

	const handleGroupNameChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setGroupName(event.target.value);
	};

	const handleFriendSelection = (friend: string) => {
		setSelectedFriends((prevSelectedFriends) =>
			prevSelectedFriends.includes(friend)
				? prevSelectedFriends.filter((f) => f !== friend)
				: [...prevSelectedFriends, friend]
		);
	};

	const handleCreateGroup = () => {
		const newGroup = {
			name: groupName,
			friends: selectedFriends,
		};

		setGroups((prevGroups) => [...prevGroups, newGroup]);
		setGroupName('');
		setSelectedFriends([]);
	};

	return (
		<React.Fragment>
			<Head>
				<title>Your groups</title>
				<meta
					name="description"
					content="Onara is the perfect way to administer your repositories. Administer your application easily and efficiently."
				/>
				<link rel="icon" href="/icon.svg" />
				<link rel="manifest" href="/manifest.json" />
			</Head>

			<div className={styles.groups}>
				<div className={styles.groups_content}>
					<Sidebar username={profile?.name} />
					<div className={styles.groups_list}>
						<div className={styles.create}>
							<input
								type="text"
								placeholder="Group Name"
								value={groupName}
								onChange={handleGroupNameChange}
							/>
							<button onClick={handleCreateGroup}>Create Group</button>
						</div>
						{/* <h3>Select Friends:</h3>
						{friends.map((friend) => (
							<div key={friend}>
								<label>
									<input
										type="checkbox"
										checked={selectedFriends.includes(friend)}
										onChange={() => handleFriendSelection(friend)}
									/>
									{friend}
								</label>
							</div>
						))}
						<h2>Your Groups</h2>
						{groups.map((group) => (
							<div key={group.name}>
								<h3>{group.name}</h3>
								<ul>
									{group.friends.map((friend: string) => (
										<li key={friend}>{friend}</li>
									))}
								</ul>
							</div>
						))} */}

						<Alert text="Under construction..." />
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

	const { username } = context.params as { username: string }; // Type assertion

	try {
		const response = await fetch(`https://api.github.com/users/${username}`);
		const profileData = await response.json();

		// Fetch friends data from an API or other source
		const friendsData = ['Friend 1', 'Friend 2', 'Friend 3'];

		return {
			props: {
				session,
				profileData,
				friendsData,
			},
		};
	} catch (error) {
		console.error('Error fetching profile data:', error);
		return {
			props: {
				session,
				profileData: null,
				friendsData: [],
			},
		};
	}
};

export default Groups;

import React, { useState, useEffect } from 'react';
import { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { getSession } from 'next-auth/react';

import { ProfileProps } from '..';

import Tabs from '@/components/Tabs';
import Alert from '@/components/Alert';
import Loading from '@/components/Loading';

import styles from './index.module.scss';

const Repositories: NextPage<ProfileProps> = ({ profileData }) => {
	const [profile, setProfile] = useState<any>(profileData);
	const [repositories, setRepositories] = useState<any>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [isLoading, setIsLoading] = useState(true);

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		};
		return date.toLocaleDateString('en-US', options);
	};

	useEffect(() => {
		const fetchRepositories = async () => {
			try {
				const response = await fetch(profileData.repos_url);
				const repositoriesData = await response.json();
				setRepositories(repositoriesData);
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching repositories:', error);
			}
		};

		if (profileData) {
			fetchRepositories();
		}
	}, [profileData]);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const filteredRepositories = repositories.filter((repo: any) =>
		repo.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const isRepositoriesNotFound = filteredRepositories.length === 0;

	return (
		<React.Fragment>
			<Head>
				<title>Your repositories</title>
				<meta
					name="description"
					content="Onara is the perfect way to administer your repositories. Administer your application easily and efficiently."
				/>
				<link rel="icon" href="/icon.svg" />
				<link rel="manifest" href="/manifest.json" />
			</Head>

			<div className={styles.repositories}>
				<div className={styles.repositories_content}>
					<Tabs username={profile?.name} />

					<div className={styles.repositories_list}>
						<div className={styles.search_bar}>
							<input
								type="text"
								placeholder="Find a repository..."
								value={searchTerm}
								onChange={handleSearch}
							/>
						</div>

						{isLoading ? (
							<div className={styles.loading}>
								<Loading />
							</div>
						) : isRepositoriesNotFound ? (
							<div className={styles.repository_not_found}>
								<Alert text="Repository Not Found" />
							</div>
						) : (
							filteredRepositories.map((repo: any) => {
								return (
									<div key={repo.id} className={styles.repository}>
										<div className={styles.title}>
											<Link href={repo.html_url} target="_blank">
												{repo.name}
											</Link>
											<span>{repo.visibility}</span>
										</div>
										<div className={styles.repo_info}>
											{repo.language && <span>{repo.language}</span>}
											<span>Updated on {formatDate(repo.updated_at)}</span>
										</div>
									</div>
								);
							})
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

export default Repositories;

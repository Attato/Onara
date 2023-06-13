import React, { useState, useEffect } from 'react';
import { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { getSession } from 'next-auth/react';

import { ProfileProps } from '..';

import Tabs from '@/components/Tabs';
import Alert from '@/components/Alert';
import Loading from '@/components/Loading';

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

			<div className="bg-backgroundPrimary dark:bg-backgroundPrimaryDark">
				<div className="flex flex-col gap-6 min-h-screen p-5 text-colorPrimary dark:text-colorPrimaryDark">
					<Tabs username={profile?.name} />

					<div className="w-full">
						<div className="py-4">
							<input
								type="text"
								placeholder="Find a repository..."
								value={searchTerm}
								onChange={handleSearch}
								className="flex items-center justify-between w-full rounded-md  py-1.5 px-3 bg-backgroundSecondary dark:bg-backgroundSecondaryDark text-colorPrimary dark:text-colorPrimaryDark shadow-sm ring-inset ring-1 ring-borderColor dark:ring-borderColorDark sm:text-sm sm:leading-6 outline-none focus:ring-2 focus:ring-indigo-600 focus:dark:ring-indigo-600"
							/>
						</div>

						{isLoading ? (
							<Loading />
						) : isRepositoriesNotFound ? (
							<Alert text="Repository Not Found" />
						) : (
							filteredRepositories.map((repo: any) => {
								return (
									<div
										key={repo.id}
										className="py-6 flex flex-col gap-3 border-t border-t-borderColor dark:border-t-borderColorDark text-xs text-colorSecondary dark:text-colorSecondaryDark last:mb-10"
									>
										<div className="flex items-center gap-5">
											<Link
												href={repo.html_url}
												className="text-indigo-600 text-xl font-semibold"
												target="_blank"
											>
												{repo.name}
											</Link>
											<span className="flex items-center border border-borderColor dark:border-borderColorDark capitalize text-xs text-colorSecondary dark:text-colorSecondaryDark rounded-md px-1 py-[2px]">
												{repo.visibility}
											</span>
										</div>
										<div className="flex gap-3">
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

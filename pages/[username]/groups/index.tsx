import React, { useState } from 'react';
import { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getSession } from 'next-auth/react';
import { useTheme } from 'next-themes';

import { ProfileProps } from '..';
import Tabs from '@/components/Tabs';
import Sidebar from '@/components/Sidebar';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { fetchProfileData } from '@/lib/profile';

import styles from './index.module.scss';

const Repositories: NextPage<ProfileProps> = ({ profileData }) => {
	const { theme } = useTheme();

	const groups = [{}];
	const [searchTerm, setSearchTerm] = useState<string>('');

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	// const filteredGrops = groups.filter((group: any) =>
	// 	group.name.includes(searchTerm.toLowerCase())
	// );

	const isRepositoriesNotFound = groups?.length === 0;

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

			<div className="flex gap-8 bg-background dark:bg-backgroundDark">
				<Sidebar profileData={profileData} />
				<div className="flex w-full flex-col gap-6 min-h-screen text-colorPrimary dark:text-colorPrimaryDark">
					<Tabs username={profileData?.name} />

					<div className="w-full">
						<input
							type="text"
							placeholder="Find a group..."
							value={searchTerm}
							onChange={handleSearch}
							className="flex items-center justify-between w-full rounded-md py-2 px-3 bg-surface100 dark:bg-surface100Dark text-colorPrimary dark:text-colorPrimaryDark shadow-sm ring-inset ring-1 ring-border dark:ring-borderDark outline-none focus:ring-2 focus:ring-accent focus:dark:ring-accent text-sm"
						/>
					</div>

					<div
						className={`${theme === 'light' ? styles.light : styles.dark} ${
							styles.scroll
						} flex flex-col h-full overflow-auto`}
					>
						{profileData?.repositories.length === 0 ? (
							<div className="flex flex-col h-full items-center justify-center">
								<Image
									src={
										theme === 'light'
											? '/illustrations/not-found-light.svg'
											: '/illustrations/not-found-dark.svg'
									}
									width={421}
									height={218}
									alt="not found"
								/>
								<p className="mt-10 text-colorSecondary dark:text-colorSecondaryDark">
									We could not find your repositories.
								</p>
							</div>
						) : isRepositoriesNotFound ? (
							<div className="flex flex-col h-full items-center justify-center">
								<Image
									src={
										theme === 'light'
											? '/illustrations/not-found-light.svg'
											: '/illustrations/not-found-dark.svg'
									}
									width={421}
									height={218}
									alt="not found"
								/>
								<p className="mt-10 text-colorSecondary dark:text-colorSecondaryDark">
									We could not find a repository with that name.
								</p>
							</div>
						) : (
							groups?.map((group: any) => {
								return (
									<div
										key={group.id}
										className="py-6 flex flex-col gap-3 border-t border-t-border dark:border-t-borderDark text-xs text-colorSecondary dark:text-colorSecondaryDark last:mb-10"
									>
										{/* <div className="flex items-center gap-5">
											<Link
												href={group.htmlUrl}
												className="text-colorPrimary dark:text-colorPrimaryDark text-xl font-semibold"
												target="_blank"
											>
												{group.name}
											</Link>
											<span className="flex items-center bg-surface100 dark:bg-surface100Dark border border-border dark:border-borderDark capitalize text-xs text-colorSecondary dark:text-colorSecondaryDark rounded-md px-1 py-[2px]">
												{group.visibility}
											</span>
										</div>
										<div className="flex gap-3">
											{group.language && <span>{group.language}</span>}
										</div> */}
										Under contruction...
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

	try {
		const profileData = await fetchProfileData(session);

		return {
			props: {
				session,
				profileData,
				...(await serverSideTranslations(context.locale || 'en', [
					'common',
					'homepage',
				])),
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

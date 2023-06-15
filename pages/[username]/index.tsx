import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { StarIcon, EyeIcon } from '@heroicons/react/24/outline';
import { fetchProfileData } from '@/lib/profile';

import Tabs from '@/components/Tabs';
import Sidebar from '@/components/Sidebar';

export interface ProfileProps {
	profileData: any;
}

const Profile: NextPage<ProfileProps> = ({ profileData }) => {
	const { status } = useSession();

	console.log(profileData);

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
				<div className="bg-background dark:bg-backgroundDark min-h-screen">
					<div className="flex gap-8 h-full">
						<Sidebar profileData={profileData} />

						<div className="flex flex-col gap-4 w-full">
							<Tabs username={profileData?.name} />
							<div className="flex items-center gap-6">
								{profileData && (
									<React.Fragment>
										<Image
											src={`${profileData?.image}`}
											width={150}
											height={150}
											alt="profile image"
											priority={true}
											className="rounded-[20px] hover:rounded-[50%] transition-all select-none shadow-md"
										/>
										<div className="flex items-end gap-10 w-full">
											<div className="flex flex-col gap-1 text-sm text-colorSecondary dark:text-colorSecondaryDark">
												<h1 className="text-2xl font-semibold text-colorPrimary dark:text-colorPrimaryDark">
													{profileData?.name}
												</h1>
												<span>{profileData?.bio}</span>
												<div className="flex items-center gap-2 text-colorSecondary dark:text-colorSecondaryDark hover:text-indigo-400 dark:hover:text-indigo-400 transition-all">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														aria-label="github"
														height="16"
														viewBox="0 0 14 14"
														width="16"
													>
														<path
															fill="currentColor"
															fillRule="nonzero"
															d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
														></path>
													</svg>
													<Link href={profileData?.htmlUrl} target="_blank">
														{profileData?.htmlUrl}
													</Link>
												</div>
											</div>

											<div className="flex flex-col gap-1 justify-between text-colorSecondary dark:text-colorSecondaryDark select-none">
												<div className="flex items-center gap-1 text-sm">
													<StarIcon width={16} height={16} />
													{profileData?.starredRepos} starred
												</div>
												<div className="flex items-center gap-1 text-sm">
													<EyeIcon width={16} height={16} />
													{profileData?.starredRepos} watching
												</div>
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

	try {
		// https://api.github.com/users/${username}
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

export default Profile;

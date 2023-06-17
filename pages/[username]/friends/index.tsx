import React, { useState } from 'react';

import { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import { getSession } from 'next-auth/react';

import { MapPinIcon } from '@heroicons/react/24/outline';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { fetchProfileData } from '@/lib/profile';

import { Dialog, Transition } from '@headlessui/react';

import Sidebar from '@/components/Sidebar';
import Tabs from '@/components/Tabs';

const Friends: NextPage<any> = ({ profileData }) => {
	const { theme } = useTheme();

	const [searchQuery, setSearchQuery] = useState('');

	const filteredFollowers = profileData?.followers.filter((friend: any) =>
		friend.login.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const isUserNotFound = filteredFollowers.length === 0;

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	let [isModalOpen, setIsModalOpen] = useState(false);

	function closeModal() {
		setIsModalOpen(false);
	}

	function openModal() {
		setIsModalOpen(true);
	}

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

			<div className="flex bg-background dark:bg-backgroundDark">
				<Sidebar profileData={profileData} />
				<div className="flex flex-col gap-6 w-full min-h-screen p-5 text-colorPrimary dark:text-colorPrimaryDark">
					<Tabs username={profileData?.name} />

					<div className="w-full flex flex-col">
						<div className="flex gap-3">
							<input
								type="text"
								placeholder="Find a friend..."
								value={searchQuery}
								onChange={handleSearch}
								className="flex items-center justify-between w-full rounded-md py-2 px-3 bg-surface100 dark:bg-surface100Dark text-colorPrimary dark:text-colorPrimaryDark shadow-sm ring-inset ring-1 ring-border dark:ring-borderDark outline-none focus:ring-2 focus:ring-accent focus:dark:ring-accent text-sm"
							/>

							<div className="w-full max-w-[125px] flex items-center justify-center">
								<button
									type="button"
									onClick={openModal}
									className="w-full h-full rounded-lg bg-surface100 border border-border dark:border-borderDark dark:bg-surface100Dark text-sm text-colorSecondary dark:text-colorSecondaryDark"
								>
									Add friends
								</button>
							</div>
							<Transition appear show={isModalOpen} as={React.Fragment}>
								<Dialog as="div" className="relative z-10" onClose={closeModal}>
									<Transition.Child
										as={React.Fragment}
										enter="ease-out duration-300"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="ease-in duration-200"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<div className="fixed inset-0 bg-black bg-opacity-25" />
									</Transition.Child>

									<div className="fixed inset-0 overflow-y-auto">
										<div className="flex min-h-full items-center justify-center p-4 text-center">
											<Transition.Child
												as={React.Fragment}
												enter="ease-out duration-300"
												enterFrom="opacity-0 scale-95"
												enterTo="opacity-100 scale-100"
												leave="ease-in duration-200"
												leaveFrom="opacity-100 scale-100"
												leaveTo="opacity-0 scale-95"
											>
												<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
													<Dialog.Title
														as="h3"
														className="text-lg font-medium leading-6 text-gray-900"
													>
														Payment successful
													</Dialog.Title>
													<div className="mt-2">
														<p className="text-sm text-gray-500">
															Your payment has been successfully submitted.
															We’ve sent you an email with all of the details of
															your order.
														</p>
													</div>

													<div className="mt-4">
														<button
															type="button"
															className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
															onClick={closeModal}
														>
															Got it, thanks!
														</button>
													</div>
												</Dialog.Panel>
											</Transition.Child>
										</div>
									</div>
								</Dialog>
							</Transition>
						</div>
					</div>

					{isUserNotFound ? (
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
								We could not find anyone by that name.
							</p>
						</div>
					) : (
						<React.Fragment>
							{filteredFollowers.map((friend: any) => {
								console.log(friend);

								return (
									<div
										key={friend.id}
										className="flex py-6 border-t border-border dark:border-borderDark"
									>
										<Link
											href={friend.htmlUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="w-full flex items-center gap-6"
										>
											<Image
												src={friend.image}
												width={80}
												height={80}
												alt={friend.login}
												className="rounded-[50%]"
											/>

											<div className="flex flex-col gap-3 text-colorSecondary dark:text-colorSecondaryDark text-sm">
												<h3 className="text-colorPrimary dark:text-colorPrimaryDark text-base font-medium">
													{friend.login}
												</h3>
												{friend.bio && <span>{friend.bio}</span>}

												<span className="flex items-center gap-2">
													{friend.location && (
														<>
															<MapPinIcon width={16} height={16} />
															<span>{friend.location}</span>
														</>
													)}
												</span>
											</div>
										</Link>
									</div>
								);
							})}
						</React.Fragment>
					)}
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
export default Friends;

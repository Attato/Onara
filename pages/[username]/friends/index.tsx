import React, { useState } from 'react';

import { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { getSession } from 'next-auth/react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { fetchProfileData } from '@/lib/profile';

import { Dialog, Transition } from '@headlessui/react';

import Sidebar from '@/components/Sidebar';
import Tabs from '@/components/Tabs';

const Friends: NextPage<any> = ({ profileData }) => {
	const [searchQuery, setSearchQuery] = useState('');

	// const filteredFollowers = profileData?.followers.filter((friend: any) =>
	// 	friend.login.toLowerCase().includes(searchQuery.toLowerCase())
	// );

	// const isUserNotFound = filteredFollowers.length === 0;

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

	const [selectedFriends, setSelectedFriends] = useState<any[]>([]);

	const handleFriendClick = (friend: any) => {
		setSelectedFriends((prevSelectedFriends: any[]) => {
			const isFriendSelected = prevSelectedFriends.some(
				(selectedFriend) => selectedFriend.id === friend.id
			);
			if (isFriendSelected) {
				return prevSelectedFriends.filter(
					(selectedFriend) => selectedFriend.id !== friend.id
				);
			}
			return [...prevSelectedFriends, friend];
		});
	};

	const submitData = async () => {
		try {
			const dataToSend = {
				selectedFriends: selectedFriends.map((friend) => ({
					id: friend.id,
					login: friend.login,
					image: friend.image,
					htmlUrl: friend.htmlUrl,
				})),
				userId: profileData.id,
			};

			const response = await fetch('/api/addFriends', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(dataToSend),
			});

			if (response.ok) {
				console.log('Friends added successfully!');
			} else {
				console.log('Error adding friends:', response.statusText);
			}
		} catch (error) {
			console.log('Error adding friends:', error);
		}
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

			<div className="flex bg-background dark:bg-backgroundDark gap-8">
				<Sidebar profileData={profileData} />
				<div className="flex flex-col gap-6 w-full pr-8 min-h-screen text-colorPrimary dark:text-colorPrimaryDark">
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
												<Dialog.Panel className="w-full max-w-2xl transform rounded-lg bg-background dark:bg-backgroundDark p-6 text-left align-middle shadow-xl transition-all">
													<h2 className="mb-4 text-xl font-medium">
														Add friends
													</h2>

													<div className="flex flex-col">
														<div className="flex flex-col justify-start uppercase text-colorSecondary dark:text-colorSecondaryDark font-semibold text-xs h-[512px] overflow-auto gap-2">
															<h3>Following</h3>
															<div className="flex flex-col gap-2 border-l border-l-border dark:border-l-borderDark">
																{profileData?.following.map((follow: any) => {
																	const isFriendSelected = selectedFriends.some(
																		(selectedFriend) =>
																			selectedFriend.id === follow.id
																	);

																	return (
																		<div
																			key={follow.id}
																			className={`flex items-center select-none normal-case rounded-md bg-surface100 dark:bg-surface100Dark hover:bg-surface200 hover:dark:bg-surface200Dark transition-all mx-4  ${
																				isFriendSelected
																					? 'bg-surface200 dark:bg-surface200Dark'
																					: ''
																			}`}
																		>
																			<label
																				htmlFor={`friend-${follow.id}`}
																				className="flex w-full gap-3 items-center px-3 py-2 cursor-pointer"
																			>
																				<Image
																					src={follow.image}
																					width={32}
																					height={32}
																					alt={`${follow.login} avatar`}
																					className="rounded-[50%] h-fit"
																				/>

																				<div className="flex flex-col w-full">
																					<h3 className="text-colorPrimary dark:text-colorPrimaryDark text-base font-medium">
																						{follow.login}
																					</h3>

																					<span className="flex gap-1 items-center text-xs">
																						<span>@{follow.id} </span>
																					</span>
																				</div>

																				<input
																					id={`friend-${follow.id}`}
																					type="checkbox"
																					checked={isFriendSelected}
																					onChange={() =>
																						handleFriendClick(follow)
																					}
																				/>
																			</label>
																		</div>
																	);
																})}
															</div>

															<h3>Followers</h3>
															<div className="flex flex-col gap-2 border-l border-l-border dark:border-l-borderDark">
																{profileData?.followers.map((follower: any) => {
																	const isFriendSelected = selectedFriends.some(
																		(selectedFriend) =>
																			selectedFriend.id === follower.id
																	);

																	return (
																		<div
																			key={follower.id}
																			className={`flex items-center select-none normal-case rounded-md bg-surface100 dark:bg-surface100Dark hover:bg-surface200 hover:dark:bg-surface200Dark transition-all mx-4 ${
																				isFriendSelected
																					? 'bg-surface200 dark:bg-surface200Dark'
																					: ''
																			}`}
																		>
																			<label
																				htmlFor={`friend-${follower.id}`}
																				className="flex w-full gap-3 items-center px-3 py-2 cursor-pointer"
																			>
																				<Image
																					src={follower.image}
																					width={32}
																					height={32}
																					alt={`${follower.login} avatar`}
																					className="rounded-[50%] h-fit"
																				/>

																				<div className="flex flex-col w-full">
																					<h3 className="text-colorPrimary dark:text-colorPrimaryDark text-base font-medium">
																						{follower.login}
																					</h3>

																					<span className="flex gap-1 items-center text-xs">
																						<span>@{follower.id} </span>
																					</span>
																				</div>

																				<input
																					id={`friend-${follower.id}`}
																					type="checkbox"
																					checked={isFriendSelected}
																					onChange={() =>
																						handleFriendClick(follower)
																					}
																				/>
																			</label>
																		</div>
																	);
																})}
															</div>
														</div>
														<div className="flex items-center justify-between w-full font-medium text-sm">
															<span>Selected: {selectedFriends.length}</span>
															<button
																onClick={submitData}
																className="bg-accent hover:bg-indigo-500 transition-all text-colorPrimaryDark px-3 w-full max-w-[160px] px py-2 rounded-md"
															>
																Add +
															</button>
														</div>
													</div>
												</Dialog.Panel>
											</Transition.Child>
										</div>
									</div>
								</Dialog>
							</Transition>
						</div>
					</div>

					{/* {isUserNotFound ? (
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
					)} */}
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

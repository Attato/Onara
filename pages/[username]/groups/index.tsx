import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';

import { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getSession } from 'next-auth/react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { fetchProfileData } from '@/lib/profile';

import { Dialog, Transition } from '@headlessui/react';

import Sidebar from '@/components/Sidebar';
import Tabs from '@/components/Tabs';

import { UserGroupIcon } from '@heroicons/react/24/solid';

import { useTheme } from 'next-themes';

import { motion, AnimatePresence } from 'framer-motion';

export interface Groups {
	id: number;
	title: string;
	content: string;
}

const Groups: NextPage<any> = ({ profileData }) => {
	const { theme } = useTheme();

	const [searchQuery, setSearchQuery] = useState('');

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

	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [groups, setGroups] = useState<Groups[]>([]);

	useEffect(() => {
		const savedPosts = localStorage.getItem('groups');
		if (savedPosts) {
			setGroups(JSON.parse(savedPosts));
		} else {
			setGroups([]);
		}
	}, []);

	const isUserNotFound = groups.length === 0;

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newPost: Groups = {
			id: Date.now(),
			title,
			content,
		};
		setGroups([...groups, newPost]);

		setTitle('');
		setContent('');

		localStorage.setItem('groups', JSON.stringify([...groups, newPost]));
	};

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
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
								placeholder="Find a group..."
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
									Add group
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
														Create group
													</h2>

													<form
														onSubmit={handleSubmit}
														className="w-full flex flex-col gap-3"
													>
														<div>
															<h2 className=" text-xs font-semibold text-colorSecondary dark:text-colorSecondaryDark uppercase py-2">
																Title
															</h2>

															<input
																type="text"
																placeholder="Want to write a post?"
																value={title}
																onChange={handleTitleChange}
																className="flex items-center justify-between w-full rounded-md py-2 px-3 bg-surface100 dark:bg-surface100Dark text-colorPrimary dark:text-colorPrimaryDark shadow-sm ring-inset ring-1 ring-border dark:ring-borderDark outline-none focus:ring-2 focus:ring-accent focus:dark:ring-accent text-sm"
															/>
														</div>

														<AnimatePresence>
															<motion.div
																initial={{ opacity: 0 }}
																animate={{ opacity: 1 }}
																exit={{ opacity: 0 }}
																transition={{ duration: 0.3 }}
																className="flex flex-col gap-2"
															>
																<h2 className="text-xs font-semibold text-colorSecondary dark:text-colorSecondaryDark uppercase">
																	Content
																</h2>
																<textarea
																	value={content}
																	onChange={handleContentChange}
																	placeholder="What's new with you?"
																	className="flex items-center justify-between w-full rounded-md py-2 px-3 bg-surface100 dark:bg-surface100Dark text-colorPrimary dark:text-colorPrimaryDark shadow-sm ring-inset ring-1 ring-border dark:ring-borderDark outline-none focus:ring-2 focus:ring-accent focus:dark:ring-accent text-sm resize-none"
																></textarea>
																<button
																	type="submit"
																	onClick={closeModal}
																	disabled={title.length === 0}
																	className="bg-accent hover:bg-indigo-500 transition-all text-colorPrimaryDark px-3 w-full max-w-[160px] px py-2 rounded-md text-sm disabled:bg-slate-400"
																>
																	Publish
																</button>
															</motion.div>
														</AnimatePresence>
													</form>
												</Dialog.Panel>
											</Transition.Child>
										</div>
									</div>
								</Dialog>
							</Transition>
						</div>
					</div>

					<h2 className="text-xs uppercase font-semibold text-colorSecondary dark:text-colorSecondaryDark">
						Groups — {groups.length}
					</h2>
					{isUserNotFound ? (
						<div className="flex flex-col items-center justify-center">
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
								We could not find a group with that name.
							</p>
						</div>
					) : (
						<div
							className={`${
								theme === 'light' ? 'light' : 'dark'
							} ${'scroll'} flex flex-col overflow-auto h-[calc(100vh-61px-36px-16px-72px)]`}
						>
							{groups
								.slice()
								.reverse()
								.map((group: any, id) => {
									return (
										<div
											key={id}
											className="py-6 flex items-center gap-3 border-t border-t-border dark:border-t-borderDark text-xs text-colorSecondary dark:text-colorSecondaryDark"
										>
											<UserGroupIcon
												width={40}
												height={40}
												className="bg-accent p-2 rounded-full text-colorPrimaryDark"
											/>

											<div className="flex flex-col">
												<Link
													href={`/${profileData.name}/groups/${group.id}`}
													className="text-colorPrimary dark:text-colorPrimaryDark text-lg font-semibold"
												>
													{group.title}
												</Link>
												<p className="text-sm font-medium">{group.content}</p>
											</div>
										</div>
									);
								})}
						</div>
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
export default Groups;

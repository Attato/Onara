import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UserGroupIcon } from '@heroicons/react/24/solid';
import { fetchProfileData } from '@/lib/profile';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import Tabs from '@/components/Tabs';
import Sidebar from '@/components/Sidebar';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';

import { ProfileProps } from '../..';
import Groups from '..';

interface Post {
	id: number;
	title: string;
	content: string;
	voteCount: number;
}

const Group: NextPage<ProfileProps> = ({ profileData }) => {
	const { status } = useSession();

	const { theme } = useTheme();

	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};

	const [groups, setGroups] = useState<Post[]>([]);

	const [gr, setGr] = useState([]);

	useEffect(() => {
		const storedGroups = localStorage.getItem('votes');
		if (storedGroups) {
			setGroups(JSON.parse(storedGroups));
		}
	}, [groups]);

	useEffect(() => {
		const grp = localStorage.getItem('groups');
		if (grp) {
			setGr(JSON.parse(grp));
		}
	}, []);

	const router = useRouter();

	const [voteCount, setVoteCount] = useState<number>(0);

	const handleVoteCountChange = (e: ChangeEvent<HTMLInputElement>) => {
		const count = parseInt(e.target.value);
		setVoteCount(count);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newPost: Post = {
			id: Date.now(),
			title,
			content,
			voteCount,
		};
		setGroups([...groups, newPost]);

		setTitle('');
		setContent('');

		localStorage.setItem('votes', JSON.stringify([...groups, newPost]));
	};

	let [isModalOpen, setIsModalOpen] = useState(false);

	function closeModal() {
		setIsModalOpen(false);
	}

	function openModal() {
		setIsModalOpen(true);
	}

	const handleDelete = (postId: number) => {
		const updatedPosts = groups.filter((group) => group.id !== postId);
		setGroups(updatedPosts);
		localStorage.setItem('votes', JSON.stringify(updatedPosts));
	};

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

							<div
								className={`${
									theme === 'light' ? 'light' : 'dark'
								} ${'scroll'} h-fit overflow-auto max-w-[calc(100%-380px)] pr-4`}
							>
								<div className="flex items-center gap-6 max-w-5xl">
									<React.Fragment>
										{profileData ? (
											<UserGroupIcon
												width={150}
												height={150}
												className="rounded-[20px] hover:rounded-[50%] transition-all select-none shadow-md bg-accent max-w-[150px] w-full p-6 text-colorPrimaryDark"
											/>
										) : (
											<div className="min-w-[150px] h-[150px] rounded-[50%] bg-surface75 dark:bg-surface75Dark flex items-center justify-center">
												null
											</div>
										)}
										<div className="flex flex-col gap-4 w-full">
											<div className="flex flex-col gap-1 text-sm text-colorSecondary dark:text-colorSecondaryDark">
												{gr

													.filter((group: any) => group.id == router.query.id)
													.map((group: any) => {
														return (
															<React.Fragment key={group.id}>
																<h1 className="text-2xl font-semibold text-colorPrimary dark:text-colorPrimaryDark">
																	{group.title}
																</h1>

																<span>{group.content}</span>
																<span className="flex items-center gap-1">
																	Creator:
																	<Image
																		src={profileData.image}
																		width={32}
																		height={32}
																		alt={profileData.name + 'avatar'}
																		className="rounded-[50%] ml-1"
																	/>
																	<span className="font-semibold">
																		{profileData.name}
																	</span>
																</span>
															</React.Fragment>
														);
													})}
											</div>

											<div>
												{groups
													.filter((group: any) => group.id == router.query.id)
													.map((group: any) => {
														return (
															<React.Fragment key={group.id}>
																<h1 className="text-2xl font-semibold text-colorPrimary dark:text-colorPrimaryDark">
																	{group.title}
																</h1>

																<span>{group.content}</span>
																<span className="flex items-center gap-1">
																	Creator:
																	<Image
																		src={profileData.image}
																		width={32}
																		height={32}
																		alt={profileData.name + 'avatar'}
																		className="rounded-[50%] ml-1"
																	/>
																	<span className="font-semibold">
																		{profileData.name}
																	</span>
																</span>
															</React.Fragment>
														);
													})}

												<button
													type="button"
													onClick={openModal}
													className="max-w-xs py-2 w-full h-full rounded-lg bg-surface100 border border-border dark:border-borderDark dark:bg-surface100Dark text-sm text-colorSecondary dark:text-colorSecondaryDark"
												>
													Add vote
												</button>

												<Transition
													appear
													show={isModalOpen}
													as={React.Fragment}
												>
													<Dialog
														as="div"
														className="relative z-10"
														onClose={closeModal}
													>
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

																					<h2 className="text-xs font-semibold text-colorSecondary dark:text-colorSecondaryDark uppercase">
																						Votes
																					</h2>

																					<input
																						type="number"
																						placeholder="Number of confirmations"
																						value={voteCount}
																						onChange={handleVoteCountChange}
																						min={0}
																						className="flex items-center justify-between w-full rounded-md py-2 px-3 bg-surface100 dark:bg-surface100Dark text-colorPrimary dark:text-colorPrimaryDark shadow-sm ring-inset ring-1 ring-border dark:ring-borderDark outline-none focus:ring-2 focus:ring-accent focus:dark:ring-accent text-sm"
																					/>
																					<button
																						type="submit"
																						onClick={closeModal}
																						disabled={title.length === 0}
																						className="bg-accent hover:bg-indigo-500 transition-all text-colorPrimaryDark px-3 w-full max-w-[160px] px py-2 mt-2 rounded-md text-sm disabled:bg-slate-400"
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
									</React.Fragment>
								</div>
							</div>
							<AnimatePresence>
								{groups
									.slice()
									.reverse()
									.map((group) => {
										const date = new Date(group.id);

										const formattedDate = date.toLocaleDateString('en-US', {
											day: 'numeric',
											month: 'short',
											year: 'numeric',
										});

										return (
											<motion.div
												initial={{ opacity: 0, y: -20 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -20 }}
												key={group.id}
												className="flex flex-col max-w-5xl items-start w-full rounded-md py-2 px-3 mb-4 bg-surface100 dark:bg-surface100Dark text-colorPrimary dark:text-colorPrimaryDark shadow-sm ring-inset ring-1 ring-border dark:ring-borderDark"
											>
												<div className="flex items-center justify-between w-full">
													<div className="flex items-center gap-2">
														<Image
															src={`${profileData?.image}`}
															width={32}
															height={32}
															alt="profile image"
															priority={true}
															className="rounded-[20px] hover:rounded-[50%] transition-all select-none shadow-md max-h-8"
														/>

														<div className="flex flex-col">
															<h3 className="font-semibold">
																{profileData?.name}
															</h3>

															<span className="text-sm text-colorSecondary dark:text-colorSecondaryDark">
																{formattedDate}
															</span>
														</div>
													</div>

													<button
														onClick={() => handleDelete(group.id)}
														className="text-colorSecondary dark:text-colorSecondaryDark hover:text-colorPrimary hover:dark:text-colorPrimaryDark p-1 hover:bg-surface300 hover:dark:bg-surface300Dark rounded-md transition-all"
													>
														<XMarkIcon width={16} height={16} strokeWidth={2} />
													</button>
												</div>
												<div className="text-base font-semibold mb-2 mt-3 flex items-baseline gap-3 pl-10">
													<h2>{group.title}</h2>
												</div>
												<p className="text-colorSecondary dark:text-colorSecondaryDark text-sm leading-6 pl-10">
													{group.content}
												</p>

												<p className="text-colorSecondary dark:text-colorSecondaryDark text-sm leading-6 pl-10">
													Need vote: {group.voteCount}
												</p>

												<div className="flex w-full items-center">
													<p className="text-colorSecondary dark:text-colorSecondaryDark text-sm leading-6 pl-10">
														Vote count: {voteCount}
													</p>

													<button
														onClick={() => {
															if (voteCount < 1) {
																setVoteCount(voteCount + 1);
															}
														}}
														className="bg-accent hover:bg-indigo-500 transition-all text-colorPrimaryDark  w-full max-w-[100px] ml-10 py-1 rounded-md"
													>
														Vote
													</button>
												</div>
											</motion.div>
										);
									})}
							</AnimatePresence>
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

export default Group;

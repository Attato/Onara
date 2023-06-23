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

import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';

import { ProfileProps } from '../..';

interface Post {
	userId: number;
	title: string;
	content: string;
	voteCount: number;
}

const Group: NextPage<ProfileProps> = ({ profileData }) => {
	const { status } = useSession();

	const { theme } = useTheme();

	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		const savedPosts = localStorage.getItem('posts');
		if (savedPosts) {
			setPosts(JSON.parse(savedPosts));
		} else {
			setPosts([]);
		}
	}, []);

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};

	const [groups, setGroups] = useState<Post[]>([]);

	useEffect(() => {
		const storedGroups = localStorage.getItem('votes');
		if (storedGroups) {
			setGroups(JSON.parse(storedGroups));
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
			userId: Date.now(),
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
								} ${'scroll'} max-h-[calc(100vh-16px-61px)] h-full overflow-auto max-w-[calc(100%-380px)] pr-4`}
							>
								<div className="flex items-center gap-6 max-w-5xl">
									<React.Fragment>
										{profileData ? (
											<UserGroupIcon
												width={150}
												height={150}
												className="rounded-[20px] hover:rounded-[50%] transition-all select-none shadow-md bg-accent max-w-[150px] w-full p-6"
											/>
										) : (
											<div className="min-w-[150px] h-[150px] rounded-[50%] bg-surface75 dark:bg-surface75Dark flex items-center justify-center">
												null
											</div>
										)}
										<div className="flex flex-col gap-4 w-full">
											<div className="flex flex-col gap-1 text-sm text-colorSecondary dark:text-colorSecondaryDark">
												{profileData ? (
													groups
														.filter((group: any) => group.id == router.query.id)
														.map((group: any) => {
															console.log(group);

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
														})
												) : (
													<React.Fragment>
														<h1 className="text-2xl font-semibold text-colorPrimary dark:text-colorPrimaryDark">
															Username
														</h1>
														<span>Hello, i am null!</span>
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
															<Link href="/" target="_blank">
																http://localhost:3000/undefined
															</Link>
														</div>
													</React.Fragment>
												)}
											</div>

											<div>
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
									</React.Fragment>
								</div>
							</div>
							<div>
								{groups.map((vote) => {
									return <div key={vote.userId}>{vote.title}</div>;
								})}
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

export default Group;

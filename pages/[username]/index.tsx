import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { StarIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { fetchProfileData } from '@/lib/profile';
import { useTheme } from 'next-themes';

import Tabs from '@/components/Tabs';
import Sidebar from '@/components/Sidebar';

import { motion, AnimatePresence } from 'framer-motion';

export interface ProfileProps {
	profileData: any;
}

interface Post {
	id: number;
	title: string;
	content: string;
}

const Profile: NextPage<ProfileProps> = ({ profileData }) => {
	const { status } = useSession();

	const { theme } = useTheme();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (status === 'authenticated') {
			const timeout = setTimeout(() => {
				setLoading(false);
			}, 3000);

			return () => clearTimeout(timeout);
		}
	}, [status]);

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

	const handleDelete = (postId: number) => {
		const updatedPosts = posts.filter((post) => post.id !== postId);
		setPosts(updatedPosts);
		localStorage.setItem('posts', JSON.stringify(updatedPosts));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newPost: Post = {
			id: Date.now(),
			title,
			content,
		};
		setPosts([...posts, newPost]);

		setTitle('');
		setContent('');

		localStorage.setItem('posts', JSON.stringify([...posts, newPost]));
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

			<AnimatePresence>
				{loading && (
					<motion.div
						className="fixed w-screen overflow-hidden bg-background dark:bg-backgroundDark min-h-screen z-10 flex flex-col justify-center items-center transition-all"
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex flex-col">
							{theme === 'light' ? (
								<Image
									src={'/illustrations/loading-light.svg'}
									width={421}
									height={218}
									alt="loading image"
								/>
							) : (
								<Image
									src={'/illustrations/loading-dark.svg'}
									width={421}
									height={218}
									alt="loading image"
								/>
							)}
						</div>
						<p className="mt-10 text-colorSecondary dark:text-colorSecondaryDark">
							We are guiding you on the right path. Please wait.
						</p>
					</motion.div>
				)}
			</AnimatePresence>

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
											<Image
												src={`${profileData?.image}`}
												width={150}
												height={150}
												alt="profile image"
												priority={true}
												className="rounded-[20px] hover:rounded-[50%] transition-all select-none shadow-md"
											/>
										) : (
											<div className="min-w-[150px] h-[150px] rounded-[50%] bg-surface75 dark:bg-surface75Dark flex items-center justify-center">
												null
											</div>
										)}
										<div className="flex items-end gap-10 w-full">
											<div className="flex flex-col gap-1 text-sm text-colorSecondary dark:text-colorSecondaryDark">
												{profileData ? (
													<React.Fragment>
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
													</React.Fragment>
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

											<div className="flex flex-col gap-1 justify-between text-colorSecondary dark:text-colorSecondaryDark select-none">
												<div className="flex items-center gap-1 text-sm">
													<StarIcon width={16} height={16} />4 starred
													{/* {profileData?.starredRepos} */}
												</div>
												<div className="flex items-center gap-1 text-sm">
													<EyeIcon width={16} height={16} />
													13 watching
													{profileData?.watchingRepos}
												</div>
											</div>
										</div>
									</React.Fragment>
								</div>
								<div className="flex flex-col h-fit items-center max-w-5xl mt-4">
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
										{title.length !== 0 && (
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
														className="bg-accent hover:bg-indigo-500 transition-all text-colorPrimaryDark px-3 w-full max-w-[160px] px py-2 rounded-md text-sm"
													>
														Publish
													</button>
												</motion.div>
											</AnimatePresence>
										)}
									</form>

									<div className="w-full flex flex-col gap-3 mt-3">
										{posts.length !== 0 && (
											<h2 className=" text-xs font-semibold text-colorSecondary dark:text-colorSecondaryDark uppercase">
												Posts
											</h2>
										)}
										<AnimatePresence>
											{posts
												.slice()
												.reverse()
												.map((post) => {
													console.log(post);

													const date = new Date(post.id);

													const formattedDate = date.toLocaleDateString(
														'en-US',
														{
															day: 'numeric',
															month: 'short',
															year: 'numeric',
														}
													);

													return (
														<motion.div
															initial={{ opacity: 0, y: -20 }}
															animate={{ opacity: 1, y: 0 }}
															exit={{ opacity: 0, y: -20 }}
															key={post.id}
															className="flex flex-col items-start w-full rounded-md py-2 px-3 mb-4 bg-surface100 dark:bg-surface100Dark text-colorPrimary dark:text-colorPrimaryDark shadow-sm ring-inset ring-1 ring-border dark:ring-borderDark"
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
																	onClick={() => handleDelete(post.id)}
																	className="text-colorSecondary dark:text-colorSecondaryDark hover:text-colorPrimary hover:dark:text-colorPrimaryDark p-1 hover:bg-surface300 hover:dark:bg-surface300Dark rounded-md transition-all"
																>
																	<XMarkIcon
																		width={16}
																		height={16}
																		strokeWidth={2}
																	/>
																</button>
															</div>
															<div className="text-base font-semibold mb-2 mt-3 flex items-baseline gap-3 pl-10">
																<h2>{post.title}</h2>
															</div>
															<p className="text-colorSecondary dark:text-colorSecondaryDark text-sm leading-6 pl-10">
																{post.content}
															</p>
														</motion.div>
													);
												})}
										</AnimatePresence>
									</div>
								</div>
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

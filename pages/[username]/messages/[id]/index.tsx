import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/dist/client/image';
import Sidebar from '@/components/Sidebar';
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { fetchProfileData } from '@/lib/profile';
import { ProfileProps } from '../..';
import { NextPage } from 'next/types';
import { PaperAirplaneIcon, CheckIcon } from '@heroicons/react/24/solid';
import { useTheme } from 'next-themes';

interface Message {
	id: number;
	message: string;
}

interface MessagesState {
	[friendId: string]: Message[];
}

const Messages: NextPage<ProfileProps> = ({ profileData }) => {
	const router = useRouter();

	const { theme } = useTheme();

	const [message, setMessage] = useState<string>('');
	const [messages, setMessages] = useState<MessagesState>({});

	console.log(messages);

	useEffect(() => {
		const friendId = String(router.query.id);
		const savedMessages = localStorage.getItem(`messages_${friendId}`);
		if (savedMessages) {
			setMessages((prevMessages) => ({
				...prevMessages,
				[friendId]: JSON.parse(savedMessages),
			}));
		} else {
			setMessages((prevMessages) => ({
				...prevMessages,
				[friendId]: [],
			}));
		}
	}, [router.query.id]);

	const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const friendId = String(router.query.id);
		const newPost: Message = {
			id: Date.now(),
			message,
		};
		const updatedMessages = [...(messages[friendId] || []), newPost];
		setMessages((prevMessages) => ({
			...prevMessages,
			[friendId]: updatedMessages,
		}));

		setMessage('');

		localStorage.setItem(
			`messages_${friendId}`,
			JSON.stringify(updatedMessages)
		);
	};

	const friendId = String(router.query.id);

	return (
		<>
			<div className="bg-background dark:bg-backgroundDark min-h-screen">
				<div className="flex gap-8 h-full">
					<Sidebar profileData={profileData} />

					<div className="flex flex-col gap-4 w-full max-w-3xl">
						{profileData.friends
							.filter((friend: any) => friend.id === router.query.id)
							.map((friend: any) => {
								return (
									<div
										key={friend.id}
										className="flex items-center gap-3 hover:bg-surface300 hover:dark:bg-surface300Dark text-colorSecondary dark:text-colorSecondaryDark hover:text-colorPrimary hover:dark:text-colorPrimaryDark px-3 py-2 transition-all border-b border-b-border dark:border-b-borderDark w-full"
									>
										<div className="relative">
											<Image
												src={friend.image}
												width={32}
												height={32}
												alt={friend.name + 'avatar'}
												className="rounded-[50%]"
											/>
											<div className="bg-surface100 dark:bg-surface100Dark w-[14px] h-[14px] absolute right-[-2px] bottom-[-2px] rounded-[50%] flex items-center justify-center">
												<div className="w-[10px] h-[10px] rounded-[50%] border-[2px] border-colorSecondary dark:border-colorSecondaryDark group-hover:border-colorPrimaryDark" />
											</div>
										</div>

										<div className="flex flex-col items-start">
											<h3 className="text-sm text-colorPrimary dark:text-colorPrimaryDark font-medium">
												{friend.name}
											</h3>
											<span className="text-xs font-medium">@{friend.id}</span>
										</div>
									</div>
								);
							})}

						<div
							className={`${
								theme === 'light' ? 'light' : 'dark'
							} ${'scroll'} flex flex-col items-end justify-end gap-2 max-w-5xl h-[calc(100vh-36px-12px-32px-53px-16px)] pr-2 overflow-auto ml-auto`}
						>
							<div className="h-full flex flex-col gap-2">
								{messages[friendId]?.map((message: any) => {
									const date = new Date(message.id);

									const formattedDate = date.toLocaleDateString('en-US', {
										hour: 'numeric',
										minute: 'numeric',
									});

									return (
										<div
											key={message.id}
											className="flex items-end justify-end w-fit rounded-md py-2 px-3 bg-surface100 dark:bg-surface100Dark text-colorPrimary dark:text-colorPrimaryDark shadow-sm last:mb-8 text-sm"
										>
											<div className="flex items-end gap-3">
												<div className="flex flex-col">
													<div className="flex items-baseline gap-2">
														<h2 className="text-sm text-accent font-medium">
															{profileData.name}
														</h2>
														<span className="text-xs font-medium text-colorSecondary dark:text-colorSecondaryDark">
															{formattedDate}
														</span>
													</div>
													<span className="text-md text-colorPrimary dark:text-colorPrimaryDark font-medium">
														{message.message}
													</span>
												</div>

												<div className="flex h-fit items-center gap-2">
													<span>
														<CheckIcon width={16} height={16} />{' '}
													</span>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
						<form className="mt-3 flex gap-3" onSubmit={handleSubmit}>
							<input
								type="text"
								placeholder="Send a message"
								value={message}
								onChange={handleMessageChange}
								className="flex items-center justify-between w-full rounded-md py-2 px-3 bg-surface100 dark:bg-surface100Dark text-colorPrimary dark:text-colorPrimaryDark shadow-sm ring-inset ring-1 ring-border dark:ring-borderDark outline-none focus:ring-2 focus:ring-accent focus:dark:ring-accent text-sm text-"
							/>

							<button
								type="submit"
								className={`${
									message.length === 0 && 'cursor-not-allowed'
								} bg-accent hover:bg-indigo-500 transition-all text-colorPrimaryDark rounded-[50%] max-w-[36px] w-full flex items-center justify-center text-sm disabled:bg-slate-400`}
								disabled={message.length === 0}
							>
								<PaperAirplaneIcon width={16} height={16} />
							</button>
						</form>
					</div>
				</div>
			</div>
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

export default Messages;

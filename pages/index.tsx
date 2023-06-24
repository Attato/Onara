import React from 'react';
import type { NextPage } from 'next';

import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { useSession, getSession } from 'next-auth/react';

import { useTranslation } from 'next-i18next';

import {
	UserPlusIcon,
	UserIcon,
	UserGroupIcon,
	CommandLineIcon,
} from '@heroicons/react/24/solid';

import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CheckBox from '@/components/Checkbox';

const Home: NextPage = () => {
	const { status } = useSession();

	const textAnimation = {
		hidden: {
			y: 100,
			opacity: 0,
		},
		visible: {
			y: 0,
			opacity: 1,
		},
	};

	const { t } = useTranslation();

	console.log(status);

	return (
		<React.Fragment>
			<Head>
				<title>Onara</title>
				<meta
					name="description"
					content="Onara is the perfect way to administer your repositories. Administer your application easily and efficiently."
				/>
				<link rel="icon" href="/icon.svg" />
				<link rel="manifest" href="/manifest.json" />
			</Head>

			{status === 'unauthenticated' && (
				<React.Fragment>
					<main className="bg-gradient-to-t from-indigoPrimary to-indigoSecondary text-colorPrimaryDark relative overflow-x-hidden">
						<Image
							src="/illustrations/homepage_background.svg"
							className="absolute bottom-0 right-[-1px]"
							width={500}
							height={500}
							alt="homepage background illustration"
							priority={true}
						/>
						<div className="flex flex-col gap-6 py-44 px-6 text-colorPrimaryDark max-w-5xl max-lg:max-w-2xl m-auto">
							<h1 className="text-6xl max-lg:text-5xl max-w-2xl text-500 font-black">
								{t('homepage:masthead.title')}
							</h1>

							<p className="text-xl max-lg:text-base max-w-2xl leading-8">
								{t('homepage:masthead.description')}
							</p>

							<div className="flex justify-center flex-wrap gap-6 w-full"></div>
						</div>
					</main>

					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.3 }}
						className="bg-background dark:bg-backgroundDark"
					>
						<motion.div
							className="max-w-5xl m-auto py-16 px-6 min-h-[400px] flex flex-col items-center text-center justify-center"
							variants={textAnimation}
							animate={{ y: 100 }}
							transition={{ ease: 'easeInOut', duration: 0.5 }}
						>
							<div className="max-w-md">
								<span className="text-accent dark:text-indigo-400 font-semibold flex items-center justify-center gap-2">
									<UserPlusIcon width={20} height={20} />
									Friendship
								</span>
								<h1 className="text-colorPrimary dark:text-colorPrimaryDark text-4xl font-semibold w-full mt-2">
									{t('homepage:section1.title')}
								</h1>
								<p className="text-colorSecondary dark:text-colorSecondaryDark text-lg mt-3 font-medium">
									{t('homepage:section1.description')}
								</p>
							</div>
							<div className="w-full max-w-2xl transform rounded-lg bg-background dark:bg-surface50Dark p-6 mt-3 text-left align-middle shadow-xl transition-all">
								<div className="flex flex-col">
									<div className="flex flex-col justify-start uppercase text-colorSecondary dark:text-colorSecondaryDark font-semibold text-xs h-[512px] overflow-auto gap-2">
										<h3>Following</h3>
										<div className="flex flex-col gap-2 border-l border-l-surface75 dark:border-l-surface75Dark">
											{/* First */}
											<div className="flex items-center select-none normal-case rounded-md bg-surface200 dark:bg-surface200Dark hover:bg-surface200 hover:dark:bg-surface200Dark transition-all mx-4 ">
												<div className="flex w-full gap-3 items-center px-3 py-2 cursor-pointer">
													<div className="bg-accent text-colorPrimaryDark rounded-[50%] w-8 h-8 flex items-center">
														<UserIcon width={32} height={20} />
													</div>
													<div className="flex flex-col w-full">
														<h3 className="text-colorPrimary dark:text-colorPrimaryDark text-base font-medium">
															William
														</h3>
														<span className="flex gap-1 items-center text-xs">
															<span>@william12345</span>
														</span>
													</div>

													<CheckBox checked={true} readOnly />
												</div>
											</div>
											{/* Second */}
											<div className="flex items-center select-none normal-case rounded-md bg-surface100 dark:bg-surface100Dark hover:bg-surface200 hover:dark:bg-surface200Dark transition-all mx-4 ">
												<div className="flex w-full gap-3 items-center px-3 py-2 cursor-pointer">
													<div className="bg-slate-700 text-colorPrimaryDark rounded-[50%] w-8 h-8 flex items-center">
														<UserIcon width={32} height={20} />
													</div>
													<div className="flex flex-col w-full">
														<h3 className="text-colorPrimary dark:text-colorPrimaryDark text-base font-medium">
															John
														</h3>
														<span className="flex gap-1 items-center text-xs">
															<span>@bigfatelephant</span>
														</span>
													</div>

													<CheckBox checked={false} readOnly />
												</div>
											</div>
											{/* Third */}
											<div className="flex items-center select-none normal-case rounded-md bg-surface200 dark:bg-surface200Dark hover:bg-surface200 hover:dark:bg-surface200Dark transition-all mx-4 ">
												<div className="flex w-full gap-3 items-center px-3 py-2 cursor-pointer">
													<div className="bg-indigo-400 text-colorPrimaryDark rounded-[50%] w-8 h-8 flex items-center">
														<UserIcon width={32} height={20} />
													</div>
													<div className="flex flex-col w-full">
														<h3 className="text-colorPrimary dark:text-colorPrimaryDark text-base font-medium">
															Mary
														</h3>
														<span className="flex gap-1 items-center text-xs">
															<span>@Mary1992</span>
														</span>
													</div>

													<CheckBox checked={true} readOnly />
												</div>
											</div>
										</div>

										<h3>Followers</h3>
										<div className="flex flex-col gap-2 border-l border-l-border dark:border-l-borderDark">
											<div className="flex items-center select-none normal-case rounded-md bg-surface100 dark:bg-surface100Dark hover:bg-surface200 hover:dark:bg-surface200Dark transition-all mx-4 ">
												<div className="flex w-full gap-3 items-center px-3 py-2 cursor-pointer">
													<div className="bg-rose-400 text-colorPrimaryDark rounded-[50%] w-8 h-8 flex items-center">
														<UserIcon width={32} height={20} />
													</div>
													<div className="flex flex-col w-full">
														<h3 className="text-colorPrimary dark:text-colorPrimaryDark text-base font-medium">
															Anna
														</h3>
														<span className="flex gap-1 items-center text-xs">
															<span>@magicpants</span>
														</span>
													</div>

													<CheckBox checked={false} readOnly />
												</div>
											</div>

											<div className="flex items-center select-none normal-case rounded-md bg-surface100 dark:bg-surface100Dark hover:bg-surface200 hover:dark:bg-surface200Dark transition-all mx-4 ">
												<div className="flex w-full gap-3 items-center px-3 py-2 cursor-pointer">
													<div className="bg-pink-400 text-colorPrimaryDark rounded-[50%] w-8 h-8 flex items-center">
														<UserIcon width={32} height={20} />
													</div>
													<div className="flex flex-col w-full">
														<h3 className="text-colorPrimary dark:text-colorPrimaryDark text-base font-medium">
															George
														</h3>
														<span className="flex gap-1 items-center text-xs">
															<span>@peppapig</span>
														</span>
													</div>

													<CheckBox checked={false} readOnly />
												</div>
											</div>

											<div className="flex items-center select-none normal-case rounded-md bg-surface200 dark:bg-surface200Dark hover:bg-surface200 hover:dark:bg-surface200Dark transition-all mx-4 ">
												<div className="flex w-full gap-3 items-center px-3 py-2 cursor-pointer">
													<div className="bg-blue-500 text-colorPrimaryDark rounded-[50%] w-8 h-8 flex items-center">
														<UserIcon width={32} height={20} />
													</div>
													<div className="flex flex-col w-full">
														<h3 className="text-colorPrimary dark:text-colorPrimaryDark text-base font-medium">
															James
														</h3>
														<span className="flex gap-1 items-center text-xs">
															<span>@james12</span>
														</span>
													</div>

													<CheckBox checked={true} readOnly />
												</div>
											</div>
										</div>
									</div>
									<div className="flex items-center justify-between w-full font-medium text-sm">
										<span>Selected: 3</span>
										<button className="bg-accent hover:bg-indigo-500 transition-all text-colorPrimaryDark px-3 w-full max-w-[160px] px py-2 rounded-md">
											Add +
										</button>
									</div>
								</div>
							</div>
						</motion.div>
					</motion.div>
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.4 }}
						className="bg-background dark:bg-backgroundDark"
					>
						<motion.div
							className="max-w-5xl m-auto py-16 px-6 min-h-[400px] flex flex-col items-center text-center justify-center"
							variants={textAnimation}
							animate={{ y: 100 }}
							transition={{ ease: 'easeInOut', duration: 0.5 }}
						>
							<div className="max-w-md">
								<span className="text-accent dark:text-indigo-400 font-semibold flex items-center justify-center gap-2">
									<UserGroupIcon width={20} height={20} />
									Teamship
								</span>
								<h1 className="text-colorPrimary dark:text-colorPrimaryDark text-4xl font-semibold mt-2">
									{t('homepage:section2.title')}
								</h1>
								<p className="text-colorSecondary dark:text-colorSecondaryDark text-lg mt-3">
									{t('homepage:section2.description')}
								</p>
							</div>
						</motion.div>
					</motion.div>
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.4 }}
						className="bg-background dark:bg-backgroundDark"
					>
						<motion.div
							className="max-w-5xl m-auto py-16 px-6 min-h-[400px] flex flex-col items-center text-center justify-center"
							variants={textAnimation}
							animate={{ y: 100 }}
							transition={{ ease: 'easeInOut', duration: 0.5 }}
						>
							<div className="max-w-md">
								<span className="text-accent dark:text-indigo-400 font-semibold flex items-center justify-center gap-2">
									<UserGroupIcon width={20} height={20} />
									Teamwork
								</span>
								<h1 className="text-colorPrimary dark:text-colorPrimaryDark text-4xl font-semibold mt-2">
									{t('homepage:section3.title')}
								</h1>
								<p className="text-colorSecondary dark:text-colorSecondaryDark text-lg mt-3">
									{t('homepage:section3.description')}
								</p>
							</div>
						</motion.div>
					</motion.div>
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.4 }}
						className="bg-background dark:bg-backgroundDark"
					>
						<motion.div
							className="max-w-5xl m-auto py-16 px-6 min-h-[400px] flex flex-col items-center text-center justify-center"
							variants={textAnimation}
							animate={{ y: 100 }}
							transition={{ ease: 'easeInOut', duration: 0.5 }}
						>
							<div className="max-w-4xl">
								<h1 className="text-colorPrimary dark:text-colorPrimaryDark text-4xl font-semibold">
									{t('homepage:preFooter.title')}
								</h1>
								<p className="text-colorSecondary dark:text-colorSecondaryDark text-lg mt-3">
									{t('homepage:preFooter.description')}
								</p>
							</div>
						</motion.div>
					</motion.div>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const session = await getSession(context);

	if (session) {
		return {
			redirect: {
				destination: `/${session.user?.name}`,
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
			...(await serverSideTranslations(context.locale || 'en', [
				'common',
				'homepage',
			])),
		},
	};
};

export default Home;

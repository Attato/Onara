import React from 'react';
import type { NextPage } from 'next';

import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { useSession, getSession } from 'next-auth/react';

import { useTranslation } from 'next-i18next';

import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
						viewport={{ once: true, amount: 0.4 }}
						className="bg-background dark:bg-backgroundDark"
					>
						<motion.div
							className="max-w-5xl m-auto py-16 px-6 min-h-[400px] flex flex-col items-start justify-center"
							variants={textAnimation}
							animate={{ y: 100 }}
							transition={{ ease: 'easeInOut', duration: 0.5 }}
						>
							<div className="max-w-md">
								<h1 className="text-colorPrimary dark:text-colorPrimaryDark text-4xl font-semibold w-full">
									{t('homepage:section1.title')}
								</h1>
								<p className="text-colorSecondary dark:text-colorSecondaryDark text-lg mt-3">
									{t('homepage:section1.description')}
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
							className="max-w-5xl m-auto py-16 px-6 min-h-[400px] flex flex-col items-end justify-center"
							variants={textAnimation}
							animate={{ y: 100 }}
							transition={{ ease: 'easeInOut', duration: 0.5 }}
						>
							<div className="max-w-md">
								<h1 className="text-colorPrimary dark:text-colorPrimaryDark text-4xl font-semibold">
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
							className="max-w-5xl m-auto py-16 px-6 min-h-[400px] flex flex-col items-start justify-center"
							variants={textAnimation}
							animate={{ y: 100 }}
							transition={{ ease: 'easeInOut', duration: 0.5 }}
						>
							<div className="max-w-md bg-background dark:bg-backgroundDark px-8 py-6 rounded-xl border border-border dark:border-borderDark">
								<h1 className="text-colorPrimary dark:text-colorPrimaryDark text-4xl font-semibold">
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
			...(await serverSideTranslations(context.locale || 'en', [
				'common',
				'homepage',
			])),
		},
	};
};

export default Home;

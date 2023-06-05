import React from 'react';
import type { NextPage } from 'next';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { useSession, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';

import {
	LanguageIcon,
	ArrowUpIcon,
	RocketLaunchIcon,
} from '@heroicons/react/24/outline';

import { useRouter } from 'next/router';

import AuthorizationPopup from '@/components/_Templates/AuthorizationPopup';

import Dropdown from '@/components/Dropdown';

import useScroll from '@/hooks/useScroll';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import styles from './index.module.scss';

const Home: NextPage = () => {
	const { status } = useSession();
	const { scrollToTop } = useScroll();

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

	const router = useRouter();
	const { locales } = router;

	const changeLocale = (locale: string) => {
		document.cookie = `NEXT_LOCALE=${locale}`;
	};

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
					<main className={styles.masthead}>
						<div className={styles.masthead_content}>
							<h1>{t('homepage:masthead.title')}</h1>

							<p>{t('homepage:masthead.description')}</p>

							<div className={styles.masthead_buttons}>
								<Dropdown
									buttonContent={
										<button className={styles.button}>
											{t('common:buttons.language')}
											<LanguageIcon width={16} height={16} />
										</button>
									}
								>
									{locales?.map((locale, id) => {
										const { pathname, query } = router;

										return (
											<Link
												href={{ pathname, query }}
												key={id}
												locale={locale}
												onClick={() => changeLocale(locale)}
												className={styles.option}
											>
												{locale === 'en' && (
													<div>{t('common:languages.english')}</div>
												)}
												{locale === 'ru' && (
													<div>{t('common:languages.russian')}</div>
												)}
											</Link>
										);
									})}
								</Dropdown>

								<AuthorizationPopup
									title="Log in"
									buttonContent={
										<button className={styles.button}>
											{t('common:buttons.getStarted')}
											<RocketLaunchIcon width={16} height={16} />
										</button>
									}
								/>
							</div>

							<Image
								src="/illustrations/background_image.svg"
								width={600}
								height={300}
								className={styles.background_image}
								priority={true}
								alt="background"
							/>
						</div>
					</main>

					<motion.div
						className={styles.container_primary}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.4 }}
					>
						<motion.div
							className={styles.content}
							variants={textAnimation}
							animate={{ y: 100 }}
							transition={{ ease: 'easeInOut', duration: 0.5 }}
						>
							<Image
								src="/illustrations/section_1.svg"
								width={560}
								height={440}
								className={styles.illustration}
								alt="container image"
								priority={true}
							></Image>
							<div className={styles.description}>
								<h2>{t('homepage:section1.title')}</h2>
								<p>{t('homepage:section1.description')}</p>
							</div>
						</motion.div>
					</motion.div>
					<motion.div
						className={styles.container_secondary}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.4 }}
					>
						<motion.div
							className={styles.content}
							variants={textAnimation}
							animate={{ y: 100 }}
							transition={{ ease: 'easeInOut', duration: 0.5 }}
						>
							<div className={styles.description}>
								<h2>{t('homepage:section2.title')}</h2>
								<p>{t('homepage:section2.description')}</p>
							</div>

							<Image
								src="/illustrations/section_2.svg"
								width={560}
								height={440}
								className={styles.illustration}
								alt="container image"
							></Image>
						</motion.div>
					</motion.div>
					<motion.div
						className={styles.container_primary}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.4 }}
					>
						<motion.div
							className={styles.content}
							variants={textAnimation}
							animate={{ y: 100 }}
							transition={{ ease: 'easeInOut', duration: 0.5 }}
						>
							<Image
								src="/illustrations/section_3.svg"
								width={560}
								height={440}
								className={styles.illustration}
								alt="container image"
							></Image>
							<div className={styles.description}>
								<h2>{t('homepage:section3.title')}</h2>
								<p>{t('homepage:section3.description')}</p>
							</div>
						</motion.div>
					</motion.div>
					<motion.div
						className={styles.pre_footer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.4 }}
					>
						<motion.div
							className={styles.content}
							variants={textAnimation}
							animate={{ y: 100 }}
							transition={{ ease: 'easeInOut', duration: 0.5 }}
						>
							<div className={styles.description}>
								<h2>{t('homepage:preFooter.title')}</h2>
								<p>{t('homepage:preFooter.description')}</p>
							</div>

							<Image
								src="/illustrations/section_4.svg"
								width={874}
								height={530}
								className={styles.illustration}
								alt="container image"
							/>

							<div className={styles.buttons}>
								<button id={styles.back_to_top_btn} onClick={scrollToTop}>
									{t('common:buttons.backToTop')}
									<ArrowUpIcon width={16} height={16} strokeWidth={2} />
								</button>
								<AuthorizationPopup
									title="Log in"
									buttonContent={
										<button id={styles.get_started_btn}>
											{t('common:buttons.getStarted')}
											<RocketLaunchIcon width={16} height={16} />
										</button>
									}
								/>
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

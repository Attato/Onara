import React from 'react';
import type { NextPage } from 'next';

import Head from 'next/head';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { useSession, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';

import {
	LanguageIcon,
	ArrowUpIcon,
	RocketLaunchIcon,
} from '@heroicons/react/24/outline';

import AuthorizationPopup from '@/components/_Templates/AuthorizationPopup';

import useScroll from '@/hooks/useScroll';

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

	return (
		<>
			<Head>
				<title>Onara</title>
				<meta
					name="description"
					content="Onara is the perfect way to administer your repositories. Administer your application easily and efficiently."
				/>
				<link rel="icon" href="/icon.svg" />
			</Head>

			{status === 'unauthenticated' && (
				<React.Fragment>
					<main className={styles.masthead}>
						<div className={styles.masthead_content}>
							<h1>Imagine the perfect way to administer your repositories.</h1>

							<p>
								Extend the capabilities of your Github and Gitlab accounts by
								adding ONARA features to them.
							</p>

							<div className={styles.masthead_buttons}>
								<button
									id={styles.language_btn}
									onClick={() => alert('This button is not working yet')}
								>
									Language
									<LanguageIcon width={16} height={16} />
								</button>

								<AuthorizationPopup
									title="Log in"
									buttonContent={
										<button id={styles.get_started_btn}>
											Get Started
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
								<h2>Invite your friends</h2>
								<p>
									Invite your friends to the Onara app or easily import them
									from your GitHub or Gitlab repositories.
								</p>
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
								<h2>Team up</h2>
								<p>
									Create groups and assign roles to members, providing a good
									collaborative development experience.
								</p>
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
								<h2>Teamwork</h2>
								<p>
									Form groups and allocate specific roles to each member,
									fostering seamless collaboration.
								</p>
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
								<h2>Reliable platform for collective decision</h2>
								<p>
									Our platform provides a reliable and effective solution for
									collective decision-making. We enable individuals from diverse
									experiences to connect and contribute their unique
									perspectives.
								</p>
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
									Back to top
									<ArrowUpIcon width={16} height={16} strokeWidth={2} />
								</button>
								<AuthorizationPopup
									title="Log in"
									buttonContent={
										<button id={styles.get_started_btn}>
											Get Started
											<RocketLaunchIcon width={16} height={16} />
										</button>
									}
								/>
							</div>
						</motion.div>
					</motion.div>
				</React.Fragment>
			)}
		</>
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
			},
		};
	}

	return {
		props: { session },
	};
};

export default Home;

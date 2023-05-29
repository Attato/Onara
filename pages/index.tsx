import type { NextPage } from 'next';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { useSession, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';

import {
	LanguageIcon,
	RocketLaunchIcon,
	ArrowTopRightOnSquareIcon,
	ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

import { HeartIcon } from '@heroicons/react/24/solid';

import AuthorizationPopup from '@/components/_Templates/AuthorizationPopup';

import { stacks } from '../data/pages/home/stack';

import styles from './index.module.scss';

const Home: NextPage = () => {
	const { data: session, status } = useSession();

	if (status === 'unauthenticated') {
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

				<motion.main className={styles.masthead}>
					<motion.div
						className={styles.masthead_content}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<h1>Imagine perfect way to administer your repositories.</h1>

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
							alt="background"
						/>
					</motion.div>
				</motion.main>

				<motion.div className={styles.container_primary}>
					<div className={styles.content}>
						<div className={styles.description}>
							<h2>Invite your friends</h2>
							<p>
								Invite your friends to the Onara app or easily import them from
								your GitHub or Gitlab repositories.
							</p>
						</div>
					</div>
				</motion.div>
				<motion.div className={styles.container_secondary}>
					<div className={styles.content}>
						<div className={styles.description}>
							<h2>Team up</h2>
							<p>
								Create groups and assign roles to members, providing a good
								collaborative development experience.
							</p>
						</div>
					</div>
				</motion.div>
				<motion.div className={styles.container_primary}>
					<div className={styles.content}>
						<Image
							src="/illustrations/security.svg"
							width={675}
							height={440}
							alt="container image"
						/>
						<div className={styles.description}>
							<h2>Teamwork</h2>
							<p>
								Form groups and allocate specific roles to each member,
								fostering seamless collaboration.
							</p>
						</div>
					</div>
				</motion.div>
				<div className={styles.support}>
					<div className={styles.content}>
						<h1>
							<HeartIcon width={56} height={56} />
							Support ONARA
						</h1>

						<p>
							If you run a business that intends to use Onara in a
							revenue-generating product, or if you are a casual developer who
							enjoys using our product, your input will help make Onara better.
						</p>

						<Link href="https://www.patreon.com/user?u=93866410">
							Sponsor the creator
							<ArrowTrendingUpIcon width={16} height={16} />
						</Link>
					</div>
				</div>

				<div className={styles.community}>
					<div className={styles.content}>
						<h1>Community</h1>
						<p>Get involved in our community. Everyone is welcome!</p>
						<div className={styles.links}>
							<Link href="https://t.me/+wK4gxiduYBwxYzFi" target="_blank">
								<div className={styles.label}>
									{/* <IconWrapper
										width={30}
										height={30}
										fill="#11aae1"
										strokeWidth={0}
									>
										<path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
									</IconWrapper> */}
									<h5>Telegram</h5>
								</div>
								<p>For announcements, tips and general information.</p>
							</Link>
							<Link href="https://discord.gg/h272qD6kBR" target="_blank">
								<div className={styles.label}>
									{/* <IconWrapper
										width={30}
										height={30}
										fill="#7289da"
										strokeWidth={0}
									>
										<path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"></path>
									</IconWrapper> */}
									<h5>Discord</h5>
								</div>
								<p>
									To get involved in the community, ask questions and share
									tips.
								</p>
							</Link>
							<Link href="https://github.com/Attato/Onara" target="_blank">
								<div className={styles.label}>
									{/* <IconWrapper
										width={30}
										height={30}
										fill="#e7e7e7"
										strokeWidth={0}
									>
										<path d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path>
									</IconWrapper> */}
									<h5>GitHub</h5>
								</div>
								<p>Ask questions, suggest new features and contribute.</p>
							</Link>
						</div>
					</div>
				</div>
			</>
		);
	} else return null;
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

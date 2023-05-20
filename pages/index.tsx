import { useState } from 'react';
import type { NextPage } from 'next';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import IconWrapper from '@/components/IconWrapper';
import AuthorizationPopup from '@/components/_Templates/AuthorizationPopup';

// не менять путь на абсолютный, иначе приложение не будет деплоиться
import { stacks } from '../data/pages/home/stack';

import styles from './index.module.scss';

const Home: NextPage = () => {
	const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

	const openPopup = () => {
		setIsPopupOpen(!isPopupOpen);
	};

	const closePopup = () => {
		setIsPopupOpen(false);
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
			<motion.main className="main">
				<motion.div
					className={styles.masthead}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					<h1>Onara - is the perfect way to administer your repositories.</h1>

					<div className={styles.masthed_buttons}>
						<button
							id={styles.language_btn}
							onClick={() => alert('This button is not working yet')}
						>
							Language
							<IconWrapper>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
								/>
							</IconWrapper>
						</button>
						<button onClick={openPopup} id={styles.get_started_btn}>
							Get Started
							<IconWrapper>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
								/>
							</IconWrapper>
						</button>

						<AuthorizationPopup
							isPopupOpen={isPopupOpen}
							popupOnClose={closePopup}
							title="Log in"
						/>
					</div>
				</motion.div>
				<div className={styles.footer}>
					<Image
						src="/illustrations/homePage.png"
						width={512}
						height={512}
						alt="Onara - Rabbit Astronaut"
					></Image>
				</div>
			</motion.main>

			<motion.div className={styles.homepage}>
				<motion.div
					className={styles.content}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					<h1>Built on a foundation of fast, production-grade tooling</h1>

					<motion.div className={styles.foundation}>
						{stacks.map((stack) => (
							<Link
								href={stack.href}
								className={styles.stack}
								target="_blank"
								key={stack.title}
							>
								<Image
									src={stack.imageSrc}
									width={stack.imageWidth}
									height={stack.imageHeight}
									alt={stack.title}
								/>
								<h2>
									{stack.title}
									<IconWrapper width={14} height={14}>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
										></path>
									</IconWrapper>
								</h2>
								<p>{stack.description}</p>
							</Link>
						))}
					</motion.div>
				</motion.div>
			</motion.div>
			<div className={styles.support}>
				<div className={styles.content}>
					<h1>
						<IconWrapper width={56} height={56} fill="var(--warning)">
							<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
						</IconWrapper>
						Support ONARA
					</h1>

					<p>
						If you run a business that intends to use Onara in a
						revenue-generating product, or if you are a casual developer who
						enjoys using our product, your input will help make Onara better.
					</p>

					<button onClick={() => alert('This button is not working yet')}>
						Sponsor the creator
						<IconWrapper width={14} height={14} fill="var(--warning)">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
							/>
						</IconWrapper>
					</button>
				</div>
			</div>

			<div className={styles.community}>
				<div className={styles.content}>
					<h1>Community</h1>
					<p>Get involved in our community. Everyone is welcome!</p>
					<div className={styles.links}>
						<Link href="https://t.me/+wK4gxiduYBwxYzFi" target="_blank">
							<div className={styles.label}>
								<IconWrapper
									width={30}
									height={30}
									fill="#11aae1"
									strokeWidth={0}
								>
									<path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
								</IconWrapper>
								<h5>Telegram</h5>
							</div>
							<p>For announcements, tips and general information.</p>
						</Link>
						<Link href="https://discord.gg/h272qD6kBR" target="_blank">
							<div className={styles.label}>
								<IconWrapper
									width={30}
									height={30}
									fill="#7289da"
									strokeWidth={0}
								>
									<path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"></path>
								</IconWrapper>
								<h5>Discord</h5>
							</div>
							<p>
								To get involved in the community, ask questions and share tips.
							</p>
						</Link>
						<Link href="https://github.com/Attato/Onara" target="_blank">
							<div className={styles.label}>
								<IconWrapper
									width={30}
									height={30}
									fill="#e7e7e7"
									strokeWidth={0}
								>
									<path d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path>
								</IconWrapper>
								<h5>GitHub</h5>
							</div>
							<p>Ask questions, suggest new features and contribute.</p>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;

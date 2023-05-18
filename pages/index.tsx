import { useState } from 'react';
import type { NextPage } from 'next';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { signIn } from 'next-auth/react';
import IconComponent from '@/components/IconComponent';
import Popup from '@/components/Popup';

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
				<meta name="description" content="Generated by create next app" />
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
						<button id={styles.language_btn}>
							Language
							<IconComponent>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
								/>
							</IconComponent>
						</button>
						<button onClick={openPopup} id={styles.get_started_btn}>
							Get Started
							<IconComponent>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
								/>
							</IconComponent>
						</button>

						<Popup isOpen={isPopupOpen} onClose={closePopup}>
							<h1>Continue your acquaintance</h1>
							<div>
								<button onClick={() => signIn('github')}>
									Continue with GitHub
									<Image
										src="/icons/services/github.svg"
										width={18}
										height={18}
										alt="github"
									/>
								</button>
								<button onClick={() => signIn('gitlab')}>
									Continue with GitLab
									<Image
										src="/icons/services/gitlab.svg"
										width={18}
										height={18}
										alt="gitlab"
									/>
								</button>
							</div>
						</Popup>
					</div>
				</motion.div>
				<div className={styles.footer}>
					<Image
						src="/illustrations/homePage.png"
						width={512}
						height={512}
						alt="rabbit asrtonaut"
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
									<IconComponent>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
										/>
									</IconComponent>
								</h2>
								<p>{stack.description}</p>
							</Link>
						))}
					</motion.div>
				</motion.div>
			</motion.div>
		</>
	);
};

export default Home;

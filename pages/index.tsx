import type { NextPage } from 'next';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from './index.module.scss';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Onara</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/icon.svg" />
			</Head>

			<main className="main">
				<div className={styles.masthead}>
					<h1>IMAGINE A PLACE...</h1>
					<p>
						...where you and your friends can manage your project. A place where
						you can communicate, plan, vote and decide what your project will be
						like <br />
						in the near future.
					</p>
				</div>

				<div className={styles.footer}>
					<Image
						src="/homePage_1.png"
						width={512}
						height={512}
						alt="img"
						className={styles.cosmonaut}
						priority={true}
					/>
				</div>
			</main>
		</>
	);
};

export default Home;

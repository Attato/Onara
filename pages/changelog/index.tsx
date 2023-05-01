import type { NextPage } from 'next';
import Head from 'next/head';

import Attention from '@/components/Attention';

import styles from './index.module.scss';

const Changelog: NextPage = () => {
	return (
		<>
			<Head>
				<title>Changelog</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/icon.svg" />
			</Head>

			<main className="main">
				<div className={styles.page_content}>
					<h1>Changelog</h1>
					<Attention text="This page is a stub. Help us expand it by contributing!" />
				</div>
			</main>
		</>
	);
};

export default Changelog;

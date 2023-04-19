import type { NextPage } from 'next';
import Head from 'next/head';

import Stub from '@/components/stub/stub';

import styles from './index.module.scss';

const About: NextPage = () => {
	return (
		<>
			<Head>
				<title>About Onara</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/icon.svg" />
			</Head>

			<main className="main">
				<h1>About</h1>
				<Stub />
			</main>
		</>
	);
};

export default About;

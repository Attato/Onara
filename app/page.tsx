import Image from 'next/image';
import Head from 'next/head';

import Header from '@/components/header/header';

import styles from './page.module.scss';

export default function Home() {
	return (
		<div className={styles.page_container}>
			<Head>
				<link rel="icon" href="/icon.svg" />
			</Head>
			<Header />
			<main className={styles.main}>
				<div className={styles.masthead}>
					<Image src="/logo.svg" width={264} height={54} alt="img"></Image>
				</div>
			</main>
		</div>
	);
}

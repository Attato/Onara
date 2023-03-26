'use client';
import type { NextPage } from 'next';
import Link from 'next/link';

import styles from './page.module.scss';

const Custom404: NextPage = () => {
	return (
		<div className={styles.error_page}>
			<h1>404 - Page Not Found</h1>
			<p>The page you are looking for does not exist.</p>

			<Link href="/">Homepage</Link>
		</div>
	);
};

export default Custom404;

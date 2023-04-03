'use client';

import type { NextPage } from 'next';

import styles from './page.module.scss';

const Docs: NextPage = () => {
	return (
		<div className="page_content">
			<h1>Getting Started</h1>

			<div className={styles.column}>
				<h2 id="step-1">Step 1</h2>
				<h2 id="step-2">Step 2</h2>
				<h2 id="step-3">Step 3</h2>
				<h2 id="step-4">Step 4</h2>
				<h2 id="step-5">Step 5</h2>
			</div>
		</div>
	);
};

export default Docs;

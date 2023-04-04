import type { NextPage } from 'next';

import PageContent from '@/components/docs/pageContent/pageContent';
import styles from '@/components/docs/pageContent/pageContent.module.scss';

const Docs: NextPage = () => {
	return (
		<PageContent>
			<div className={styles.time_info}>
				<span>Last updated on February 6, 2023</span>
				<span> 1 min read</span>
			</div>
			<h1>Getting Started</h1>

			<div>
				<h2 id="step-1">Step 1</h2>
				<h2 id="step-2">Step 2</h2>
				<h2 id="step-3">Step 3</h2>
				<h2 id="step-4">Step 4</h2>
				<h2 id="step-5">Step 5</h2>
			</div>
		</PageContent>
	);
};

export default Docs;

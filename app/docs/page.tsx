import type { NextPage } from 'next';

import Link from 'next/link';

import PageContent from '@/components/docs/pageContent/pageContent';
import styles from '@/components/docs/pageContent/pageContent.module.scss';

const Docs: NextPage = () => {
	return (
		<PageContent>
			<div className={styles.time_info}>
				<span>Last updated on April 4, 2023</span>
				<span> 1 min read</span>
			</div>
			<h1>Introduction to ONARA</h1>

			<p>
				Welcome to ONARA, a powerful platform for managing your repositories.
				Our platform is designed to provide developers, organizations and
				individuals with an easy-to-use end-to-end solution for *there should be
				some text*.
			</p>
			<p>
				Whether you&apos;re a developer working on a large-scale project or an
				organization looking to streamline your development workflow, ONARA
				gives you the tools you need to easily manage your repositories. Our
				platform supports a wide range of programming languages and offers many
				collaboration features, making it easy for teams to collaborate on
				projects.
			</p>
			<p>
				Thank you for choosing ONARA. We will be happy to help you manage your
				repositories easily and efficiently.
			</p>
		</PageContent>
	);
};

export default Docs;

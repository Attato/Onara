import type { NextPage } from 'next';

import Link from 'next/link';

import styles from './page.module.scss';

const Docs: NextPage = () => {
	return (
		<div className="page_content">
			<h1>Introduction to ONARA</h1>

			<p>
				Welcome to ONARA, a powerful platform for managing your repositories.
				Our platform is designed to provide developers, organizations and
				individuals with an easy-to-use end-to-end solution for *there should be
				some text*. <br /> <br /> Whether you're a developer working on a
				large-scale project or an organization looking to streamline your
				development workflow, ONARA gives you the tools you need to easily
				manage your repositories. Our platform supports a wide range of
				programming languages and offers many collaboration features, making it
				easy for teams to collaborate on projects.
				<br /> <br />
				Thank you for choosing ONARA. We will be happy to help you manage your
				repositories easily and efficiently.
			</p>
		</div>
	);
};

export default Docs;

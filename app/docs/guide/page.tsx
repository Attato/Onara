'use client';

import type { NextPage } from 'next';

import styles from './page.module.scss';

const Docs: NextPage = () => {
	return (
		<div className="page_content">
			<h1>Guide</h1>

			<ul className={styles.guide_content}>
				Welcome to ONARA! Here's a quick guide to getting started with our
				repository management platform:
				<li>
					Sign up for an account: To get started with ONARA, you'll need to
					create an account. Simply click the "Sign up" button on our homepage,
					enter your email address and a secure password, and follow the prompts
					to verify your account.
				</li>
				<li>
					Create a repository: Once you've signed up for an account, you can
					create a new repository by clicking the "Create repository" button in
					your dashboard. Give your repository a name, choose your programming
					language, and select your preferred collaboration options.
				</li>
				<li>
					Add files to your repository: With your repository set up, you can
					start adding files to it. You can upload files directly from your
					computer or import code from an existing repository using our import
					tool.
				</li>
				<li>
					Manage your repository: With your files added to your repository, you
					can use ONARA's powerful management tools to organize and collaborate
					on your code. You can track changes to your code with our version
					control system, create branches for different features, and merge
					changes from different contributors.
				</li>
				<li>
					Invite collaborators: To work on your repository with others, you can
					invite collaborators to join your project. You can control access
					levels for each collaborator, so you can ensure that everyone has the
					right level of access to your code.
				</li>
				That's it! With these steps, you'll be up and running with ONARA in no
				time. If you need any help getting started, don't hesitate to reach out
				to our support team.
			</ul>
		</div>
	);
};

export default Docs;

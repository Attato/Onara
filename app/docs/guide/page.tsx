import type { NextPage } from 'next';

import PageContent from '@/components/docs/pageContent/pageContent';

import styles from './page.module.scss';

const Docs: NextPage = () => {
	return (
		<PageContent>
			<h1>Guide</h1>
			<p>
				Welcome to ONARA! Here&apos;s a quick guide to getting started with our
				repository management platform:
			</p>
			<p>
				Sign up for an account: To get started with ONARA, you&apos;ll need to
				create an account. Simply click the &quot;Sign up&quot; button on our
				homepage, enter your email address and a secure password, and follow the
				prompts to verify your account.
			</p>
			<p>
				Create a repository: Once you&apos;ve signed up for an account, you can
				create a new repository by clicking the &quot;Create repository&quot;
				button in your dashboard. Give your repository a name, choose your
				programming language, and select your preferred collaboration options.
			</p>
			<p>
				Add files to your repository: With your repository set up, you can start
				adding files to it. You can upload files directly from your computer or
				import code from an existing repository using our import tool.
			</p>
			<p>
				Manage your repository: With your files added to your repository, you
				can use ONARA&apos;s powerful management tools to organize and
				collaborate on your code. You can track changes to your code with our
				version control system, create branches for different features, and
				merge changes from different contributors.
			</p>
			<p>
				Invite collaborators: To work on your repository with others, you can
				invite collaborators to join your project. You can control access levels
				for each collaborator, so you can ensure that everyone has the right
				level of access to your code.
			</p>
			<p>
				That&apos;s it! With these steps, you&apos;ll be up and running with
				ONARA in no time. If you need any help getting started, don&apos;t
				hesitate to reach out to our support team.
			</p>
		</PageContent>
	);
};

export default Docs;

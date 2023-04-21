'use client';

import { useState } from 'react';

import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import { signIn, useSession } from 'next-auth/react';

import Loading from '@/components/loading/loading';
import Attention from '@/components/attention/attention';

import styles from '../auth.module.scss';

const SignIn: NextPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event: any) => {
		event.preventDefault();
		// handle form submission
	};

	const { data } = useSession();
	console.log(data);
	const [loading, setLoading] = useState(false);

	const handleGithubLogin = async () => {
		setLoading(true);

		const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=8748f2b3a51ce1010736&redirect_uri=${encodeURIComponent(
			process.env.NEXT_PUBLIC_GITHUB_NEXTAUTH_URL + '/api/auth/callback/github'
		)}&scope=user`;

		const popup = window.open(githubAuthUrl, '_blank', 'height=800,width=600');

		if (popup) {
			popup.focus();
			const pollTimer = setInterval(() => {
				if (popup.closed) {
					clearInterval(pollTimer);
					setLoading(false);
				}
			}, 500);
		} else {
			setLoading(false);
			alert('Failed to open Github login popup. Please try again.');
		}
	};
	return (
		<>
			<Head>
				<title>Sign in to Onara</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/icon.svg" />
			</Head>

			<main className="main">
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.with_email}>
						<h1>Sign in to Onara</h1>
						<label>
							Email
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="example@gmail.com"
							/>
						</label>
						<label>
							Password
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="********"
								autoComplete={password}
							/>
							<Link href="/auth/signin">Forgot your password?</Link>
						</label>
						<button type="submit">Continue</button>

						<span>
							Need an account? <Link href="/auth/signup">Register</Link>
						</span>
					</div>

					<div className={styles.with_options}>
						<div className={styles.qr_code}>
							<Image
								src="/icons/qr_code.svg"
								width={200}
								height={200}
								alt="qr-code"
							/>
							<p>
								Scan this with the <span>Onara mobile app</span> to log in
								instantly
							</p>
							<Attention text="This is a stub. Help us expand it by contributing!" />
						</div>
						<button
							className={styles.github_btn}
							onClick={handleGithubLogin}
							disabled={loading}
						>
							{loading ? (
								<Loading width={18} height={18} />
							) : (
								<Image
									src="/icons/github.svg"
									width={18}
									height={18}
									alt="github"
								/>
							)}
							Continue with Github
						</button>
						<button className={styles.gitlab_btn} onClick={() => signIn()}>
							<Image
								src="/icons/gitlab.svg"
								width={18}
								height={18}
								alt="gitlab"
							/>
							Continue with Gitlab
						</button>
					</div>
				</form>
			</main>
		</>
	);
};

export default SignIn;

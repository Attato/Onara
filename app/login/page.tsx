'use client';

import { useState } from 'react';

import type { NextPage } from 'next';
import Link from 'next/link';

import styles from './page.module.scss';

const Login: NextPage = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event: any) => {
		event.preventDefault();
		// handle form submission
	};

	return (
		<main className="main">
			<form className={styles.form} onSubmit={handleSubmit}>
				<h1>Log in to Onara</h1>
				<label>
					Username:
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<label>
					Email:
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<button type="submit">Continue with Email</button>
			</form>
		</main>
	);
};

export default Login;

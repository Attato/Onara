import type { NextPage } from 'next';

import styles from './page.module.scss';

const SignUp: NextPage = () => {
	return (
		<main className="main">
			<form className={styles.form}>
				<h1>Create Your Onara Account</h1>
				<label htmlFor="name">
					Name:
					<input type="text" id="name" name="name" />
				</label>

				<label htmlFor="email">
					Email:
					<input type="email" id="email" name="email" />
				</label>

				<label htmlFor="password">
					Password:
					<input type="password" id="password" name="password" />
				</label>

				<label htmlFor="confirm-password">
					Confirm Password:
					<input
						type="password"
						id="confirm-password"
						name="confirm-password"
					/>
				</label>

				{/* 
				<label htmlFor="gender">
					Gender:
					<select id="gender" name="gender">
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
				</label>

				<label htmlFor="dob">
					Date of Birth:
					<input type="date" id="dob" name="dob" />
				</label> */}

				{/* Это на будущее */}

				<button type="submit">Register</button>
			</form>
		</main>
	);
};

export default SignUp;

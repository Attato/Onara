import Link from 'next/link';

const SignIn = () => {
	return (
		<div className="min-h-screen bg-backgroundPrimary">
			<div className="max-w-5xl max-lg:max-w-2xl m-auto py-44 px-6 text-colorPrimary">
				<h1>SignIn</h1>

				<Link href="/auth/signup">SignUp</Link>
			</div>
		</div>
	);
};

export default SignIn;

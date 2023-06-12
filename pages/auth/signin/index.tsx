import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { signIn, getSession } from 'next-auth/react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const SignIn = () => {
	const router = useRouter();

	const handleSignIn = async (provider: string) => {
		const result = await signIn(provider);

		if (result?.error) {
			console.log(result.error);
		} else {
			router.push('/');
		}
	};

	return (
		<>
			<Head>
				<title>Onara</title>
				<meta
					name="description"
					content="Onara is the perfect way to administer your repositories. Administer your application easily and efficiently."
				/>
				<link rel="icon" href="/icon.svg" />
				<link rel="manifest" href="/manifest.json" />
			</Head>

			<div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-backgroundPrimary dark:bg-backgroundPrimaryDark">
				<div className="bg-backgroundPrimary dark:bg-backgroundPrimaryDark w-full mx-auto mt-10 rounded-lg max-w-sm">
					<div className="flex items-center justify-center relative">
						<div className="border-t border-borderColor dark:border-borderColorDark w-full absolute" />
						<span className="z-10 w-fit bg-backgroundPrimary dark:bg-backgroundPrimaryDark px-6 ">
							Continue with
						</span>
					</div>
					<div className="flex gap-4 mt-6">
						<button
							onClick={() => handleSignIn('github')}
							className="flex items-center justify-center group bg-githubColor w-full px-3 py-2 rounded-lg text-sm text-slate-100 gap-2 font-medium relative"
						>
							<Image
								src="/icons/services/github.svg"
								width={16}
								height={16}
								alt="gitgub"
							/>
							GitHub
							<ArrowRightIcon
								width={16}
								height={16}
								strokeWidth={3}
								className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all"
							/>
						</button>
						<button
							onClick={() => handleSignIn('gitlab')}
							className="flex items-center justify-center group bg-gitlabColor w-full px-3 py-2 rounded-lg text-sm text-slate-100 gap-2 font-medium relative"
						>
							<Image
								src="/icons/services/gitlab.svg"
								width={16}
								height={16}
								alt="gitlab"
							/>
							GitLab
							<ArrowRightIcon
								width={16}
								height={16}
								strokeWidth={3}
								className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all"
							/>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const session = await getSession(context);

	if (session) {
		return {
			redirect: {
				destination: `/${session.user?.name}`,
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
			...(await serverSideTranslations(context.locale || 'en', [
				'common',
				'homepage',
			])),
		},
	};
};

export default SignIn;

import type { NextPage } from 'next';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Attention from '@/components/attention/attention';
import FAQ from '@/components/faq/faq';

import styles from './index.module.scss';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Onara</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/icon.svg" />
			</Head>

			<main className="main">
				<div className={styles.masthead}>
					<h1>IMAGINE A PLACE...</h1>
					<p>
						...where you and your friends can manage your project. A place where
						you can communicate, plan, vote and decide what your project will be
						like <br />
						in the near future.
					</p>
				</div>

				<Attention text="This page is a stub. Help us expand it by contributing!" />

				<div className={styles.title}>
					<span>Main features</span>
					<h1>What's in Onara?</h1>
				</div>

				<div className={styles.features_grid}>
					<div className={styles.columns}>
						<Link href="/not-found">
							<span>Architecto beatae vitae dicta</span>
							<p>
								Ut enim ad minima veniam, quis nostrum exercitationem ullam
								corporis suscipit laboriosam.
							</p>
						</Link>
						<Link href="/not-found">
							<span>Neque porro quisquam est</span>
							<p>
								Nam libero tempore, cum soluta nobis est eligendi optio cumque
								nihil impedit quo minus id quod maxime placeat.
							</p>
						</Link>
					</div>
					<div className={styles.columns}>
						<Link href="/not-found">
							<span>Ut enim ad minima veniam</span>
							<p>
								Nihil molestiae consequatur, vel illum qui dolorem eum.
								Architecto beatae vitae dicta sunt explicabo.
							</p>
						</Link>
						<Link href="/not-found">
							<span>Sed ut perspiciatis unde</span>
							<p>
								Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
								consectetur, adipisci velit. Architecto beatae vitae dicta sunt
								explicabo.
							</p>
						</Link>
					</div>
					<div className={styles.columns}>
						<Link href="/not-found">
							<span>Nihil molestiae consequatur</span>
							<p>
								Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
								Integer malesuada nunc vel risus commodo viverra.
							</p>
						</Link>
						<Link href="/not-found">
							<span>Volutpat blandit aliquam</span>
							<p>
								Quisque non tellus orci ac auctor augue mauris augue. Sagittis
								nisl rhoncus mattis rhoncus urna neque.
							</p>
						</Link>
					</div>
				</div>
				<div className={styles.title}>
					<span>FAQ</span>
					<h1>Frequently asked questions</h1>
				</div>
				<FAQ
					questions={[
						{
							question:
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
							answer:
								'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
						},
						{
							question: 'Duis aute irure dolor in reprehenderit in voluptate?',
							answer:
								'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
						},
						{
							question: 'Vulputate sapien nec sagittis aliquam malesuada?',
							answer:
								'Aliquam vestibulum morbi blandit cursus. Dictum varius duis at consectetur lorem donec massa.',
						},
						{
							question: 'Tincidunt arcu non sodales neque sodales ut etiam?',
							answer:
								'Enim facilisis gravida neque convallis a cras semper auctor. Vulputate odio ut enim blandit volutpat maecenas.',
						},
					]}
				/>
				<div className={styles.footer}>
					<h1>Commence your journey today</h1>
					<Link href="/auth/signup">Sign up</Link>
					<Image
						src="/illustrations/homePage_1.png"
						width={512}
						height={512}
						alt="img"
						className={styles.cosmonaut}
						priority={true}
					/>
				</div>
			</main>
		</>
	);
};

export default Home;

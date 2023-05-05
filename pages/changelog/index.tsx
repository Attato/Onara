import type { NextPage } from 'next';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import Attention from '@/components/Attention';

import styles from './index.module.scss';

const Changelog: NextPage = () => {
	return (
		<>
			<Head>
				<title>Changelog</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/icon.svg" />
			</Head>

			<div className={styles.page_content}>
				<main className="main">
					<div className={styles.masthead}>
						<div className={styles.masthead_content}>
							<h1 className={styles.title}>Changelog</h1>
							<div className={styles.content}>
								New updates and improvements to Onara.
								<div>
									<Link href="/">Subscribe to updates</Link>
									<Link href="/">Follow us on Telegram</Link>
								</div>
							</div>
						</div>
					</div>
				</main>

				<div className={styles.changelog}>
					<div className={styles.changelog_content}>
						<div className={styles.date}>
							<p>April 19, 2023</p>
							<p>(27 days ago)</p>
						</div>

						<div className={styles.detalis}>
							<Image
								src="/illustrations/post-1.webp"
								width={1920}
								height={1080}
								alt="post-1"
							/>

							<h2>At vero eos et accusamus</h2>

							<p>
								At vero eos et accusamus et iusto odio dignissimos ducimus qui
								blanditiis praesentium voluptatum deleniti atque corrupti quos
								dolores et quas molestias excepturi sint occaecati cupiditate
								non provident, similique sunt in culpa qui officia deserunt
								mollitia animi, id est laborum et dolorum fuga.
							</p>

							<p>
								Et harum quidem rerum facilis est et expedita distinctio. Nam
								libero tempore, cum soluta nobis est eligendi optio cumque nihil
								impedit quo minus id quod maxime placeat facere possimus, omnis
								voluptas assumenda est, omnis dolor repellendus. Temporibus
								autem quibusdam et aut officiis debitis aut rerum necessitatibus
								saepe eveniet ut et voluptates repudiandae sint et molestiae non
								recusandae.
							</p>
						</div>
					</div>
				</div>

				<div className={styles.changelog}>
					<div className={styles.changelog_content}>
						<div className={styles.date}>
							<p>April 18, 2023</p>
							<p>(28 days ago)</p>
						</div>

						<div className={styles.detalis}>
							<Image
								src="/illustrations/post-2.webp"
								width={1920}
								height={1080}
								alt="post-2"
							/>

							<h2>At vero eos et accusamus</h2>

							<p>
								At vero eos et accusamus et iusto odio dignissimos ducimus qui
								blanditiis praesentium voluptatum deleniti atque corrupti quos
								dolores et quas molestias excepturi sint occaecati cupiditate
								non provident, similique sunt in culpa qui officia deserunt
								mollitia animi, id est laborum et dolorum fuga.
							</p>

							<p>
								Et harum quidem rerum facilis est et expedita distinctio. Nam
								libero tempore, cum soluta nobis est eligendi optio cumque nihil
								impedit quo minus id quod maxime placeat facere possimus, omnis
								voluptas assumenda est, omnis dolor repellendus. Temporibus
								autem quibusdam et aut officiis debitis aut rerum necessitatibus
								saepe eveniet ut et voluptates repudiandae sint et molestiae non
								recusandae.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Changelog;

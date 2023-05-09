import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import styles from './index.module.scss';

const components = {
	Image,
};

interface PostData {
	[key: string]: any;
}

interface Post {
	slug: string;
	frontMatter: PostData;
}

interface ChangelogPageProps {
	posts: Post[];
}

const Changelog: NextPage<ChangelogPageProps> = ({ posts }) => {
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

				{posts.map((post) => {
					return (
						<div key={post.slug} className={styles.changelog}>
							<div className={styles.changelog_content}>
								<div className={styles.date}>
									<p>{post.frontMatter.date}</p>

									<p>
										{post.frontMatter.isToday ? (
											<span>(Today&apos;s log)</span>
										) : (
											<span>{`(${post.frontMatter.diffDays} days ago)`}</span>
										)}
									</p>
								</div>

								<div className={styles.details}>
									<MDXRemote
										{...post.frontMatter.content}
										components={components}
									/>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

const formatDate = (date: Date) => {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	const formattedDate = date.toLocaleDateString('en-US', options);
	const today = new Date();
	const isToday = today.toLocaleDateString('en-US', options) === formattedDate;

	const diffTime = Math.abs(today.getTime() - date.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays < 1) {
		if (isToday) {
			return { formattedDate, isToday: true, diffDays };
		}
	}

	return { formattedDate, isToday: false, diffDays };
};

const getPosts = async (): Promise<Post[]> => {
	// Get the path to the directory containing the MDX files
	const mdxFilesDirectory = path.join(process.cwd(), 'posts/changelog');
	const mdxFiles = await fs.readdir(mdxFilesDirectory);

	const posts = await Promise.all(
		mdxFiles.map(async (file) => {
			const slug = file.replace(/\.mdx?$/, '');
			const fullPath = path.join(mdxFilesDirectory, file);
			const fileStats = await fs.stat(fullPath);
			const fileContents = await fs.readFile(fullPath, 'utf8');
			const { data, content } = matter(fileContents);

			const mdxSource = await serialize(content, {
				scope: data,
			});

			const { formattedDate, isToday, diffDays } = formatDate(fileStats.mtime);

			return {
				slug,
				frontMatter: {
					...data,
					content: mdxSource,
					date: formattedDate,
					isToday,
					diffDays,
				},
			};
		})
	);

	return posts;
};

export const getStaticProps: GetStaticProps<ChangelogPageProps> = async () => {
	const posts = await getPosts();

	return {
		props: {
			posts,
		},
	};
};

export default Changelog;

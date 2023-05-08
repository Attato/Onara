import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXProvider } from '@mdx-js/react';

import SideBar from '@/components/Sidebar';
import Links from '@/components/Links';

// Для использования в mdx файлах
import CodeBlock from '@/components/CodeBlock';

import styles from './index.module.scss';

interface PostData {
	[key: string]: any;
}

interface Post {
	slug: string;
	frontMatter: PostData;
}

interface SlugPageProps {
	mdxSource: any;
	frontMatter: PostData;
	allPosts: Post[];
}

const getPosts = async (): Promise<Post[]> => {
	// Get the path to the directory containing the MDX files
	const mdxFilesDirectory = path.join(process.cwd(), 'posts/docs');
	const mdxFiles = await fs.readdir(mdxFilesDirectory);

	const posts = await Promise.all(
		mdxFiles.map(async (file) => {
			const slug = file.replace(/\.mdx$/, '');
			const { data: frontMatter } = await getMdxFileContent(slug);
			return { slug, frontMatter };
		})
	);

	return posts;
};

const getMdxFileContent = async (slug: string) => {
	const mdxFilePath = path.join(process.cwd(), `posts/docs/${slug}.mdx`);
	const fileContents = await fs.readFile(mdxFilePath, 'utf-8');
	const { content, data } = matter(fileContents);

	const fileStats = await fs.stat(mdxFilePath);
	const lastUpdated = new Date(fileStats.mtime).toLocaleDateString();

	return { content, data: { ...data, lastUpdated } };
};

const components = {
	CodeBlock,
};

const SlugPage = ({ mdxSource, frontMatter, allPosts }: SlugPageProps) => {
	const formattedDate = new Date(frontMatter.lastUpdated).toLocaleDateString(
		'en-US',
		{
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}
	);
	return (
		<>
			<Head>
				<title>{frontMatter.title}</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/icon.svg" />
			</Head>

			<div className="main">
				<div className={styles.slug}>
					<SideBar posts={allPosts} />
					<div className={styles.page_content}>
						<div className={styles.time_info}>
							<span>{formattedDate}</span>
							<span> 1 min read</span>
						</div>

						<MDXProvider components={components}>
							<MDXRemote {...mdxSource} />
						</MDXProvider>

						<Links posts={allPosts} />
					</div>
				</div>
			</div>
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const mdxFilesDirectory = path.join(process.cwd(), 'posts/docs');
	const mdxFiles = await fs.readdir(mdxFilesDirectory);

	const paths = mdxFiles.map((file) => ({
		params: { slug: file.replace(/\.mdx$/, '') },
	}));

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug }: any = params;
	const { content, data: frontMatter } = await getMdxFileContent(
		slug as string
	);
	const mdxSource = await serialize(content);
	const allPosts = await getPosts();

	return { props: { mdxSource, frontMatter, allPosts } };
};

export default SlugPage;

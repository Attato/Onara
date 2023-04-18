import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote/dist/types';

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

import { GetStaticPaths, GetStaticProps } from 'next';

import SideBar from '@/components/sidebar';
import Links from '@/components/links';

import styles from './index.module.scss';

interface SlugPageProps {
	mdxSource: MDXRemoteSerializeResult;
	frontMatter: { [key: string]: any };
	allFiles: { slug: string; frontMatter: { [key: string]: any } }[];
}

// Функция для чтения содержимого MDX файла и парсинга фронтматтера
const getMdxFileContent = async (
	slug: string
): Promise<{ content: string; data: { [key: string]: any } }> => {
	const mdxFilePath = path.join(process.cwd(), `posts/${slug}.mdx`);
	const fileContents = await fs.readFile(mdxFilePath, 'utf-8');
	const { content, data } = matter(fileContents);

	return { content, data };
};

const SlugPage = ({ mdxSource, frontMatter, allFiles }: SlugPageProps) => {
	// Доступ к данным из фронтматтера
	return (
		<div className="main">
			<div className={styles.slug}>
				<SideBar posts={allFiles} />
				{/* Рендер содержимого MDX файла */}
				<div className={styles.page_content}>
					<div className={styles.time_info}>
						<span>Last updated on {frontMatter.lastUpdated}</span>
						<span> 1 min read</span>
					</div>

					<MDXRemote {...mdxSource} />
					<Links posts={allFiles} />
				</div>
			</div>
		</div>
	);
};

// Генерация статических путей на основе файлов MDX
export const getStaticPaths: GetStaticPaths = async () => {
	const mdxFilesDirectory = path.join(process.cwd(), 'posts');
	const mdxFiles = await fs.readdir(mdxFilesDirectory);
	const paths = mdxFiles.map((file) => ({
		params: { slug: file.replace(/\.mdx$/, '') },
	}));

	return { paths, fallback: false };
};

// Получение содержимого MDX файла, фронтматтера и массива объектов всех файлов из директории "posts" на основе параметра запроса slug
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug }: any = params;
	const { content, data: frontMatter } = await getMdxFileContent(
		slug as string
	);
	const mdxSource = await serialize(content);

	// Чтение всех файлов из директории "posts" и их фронтматтера
	const mdxFilesDirectory = path.join(process.cwd(), 'posts');
	const mdxFiles = await fs.readdir(mdxFilesDirectory);
	const allFiles = await Promise.all(
		mdxFiles.map(async (file) => {
			const slug = file.replace(/\.mdx$/, '');
			const { data: frontMatter } = await getMdxFileContent(slug);
			return { slug, frontMatter };
		})
	);

	return {
		props: {
			mdxSource,
			frontMatter,
			allFiles,
		},
	};
};

export default SlugPage;

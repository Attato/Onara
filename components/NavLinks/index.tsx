import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import IconWrapper from '@/components/IconWrapper';

import styles from './index.module.scss';

const NavLinks = ({ posts }: any) => {
	const router = useRouter();

	return (
		<React.Fragment>
			{posts
				.sort((a: any, b: any) => a.frontMatter.id - b.frontMatter.id)
				.filter((title: any) => `/docs/${title.slug}` === router.asPath)
				.map((item: any) => {
					return (
						<div
							className={styles.links}
							style={{
								justifyContent: `${
									item.frontMatter.id === 0 ? 'flex-end' : 'space-between'
								}`,
							}}
							key={item.frontMatter.id}
						>
							{item.frontMatter.id > 0 && (
								<Link href={posts[item.frontMatter.id - 1].slug}>
									<IconWrapper>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
										/>
									</IconWrapper>
									{posts[item.frontMatter.id - 1].frontMatter.title}
									{/* Use <a> instead of {posts[item.frontMatter.id - 1].frontMatter.title} */}
								</Link>
							)}
							{item.frontMatter.id < posts.length - 1 && (
								<Link href={posts[item.frontMatter.id + 1].slug}>
									{posts[item.frontMatter.id + 1].frontMatter.title}
									{/* Use <a> instead of {posts[item.frontMatter.id + 1].frontMatter.title} */}
									<IconWrapper>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
										/>
									</IconWrapper>
								</Link>
							)}
						</div>
					);
				})}
		</React.Fragment>
	);
};

export default NavLinks;

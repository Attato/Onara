import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
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
									<ArrowLeftIcon width={16} height={16} />
									{posts[item.frontMatter.id - 1].frontMatter.title}
								</Link>
							)}
							{item.frontMatter.id < posts.length - 1 && (
								<Link href={posts[item.frontMatter.id + 1].slug}>
									{posts[item.frontMatter.id + 1].frontMatter.title}
									<ArrowRightIcon width={16} height={16} />
								</Link>
							)}
						</div>
					);
				})}
		</React.Fragment>
	);
};

export default NavLinks;

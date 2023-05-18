import React from 'react';

import Image from 'next/dist/client/image';
import Link from 'next/dist/client/link';

import { usePathname } from 'next/navigation';

import IconComponent from '@/components/IconComponent';

import styles from './index.module.scss';

const Links = ({ posts }: any) => {
	const router = usePathname();

	return (
		<React.Fragment>
			{posts
				.filter((title: any) => `/docs/${title.slug}` === router)
				.map((item: any, id: number) => {
					return (
						<div
							className={styles.links}
							style={{
								justifyContent: `${
									item.frontMatter.id === 0 ? 'flex-end' : 'space-between'
								}`,
							}}
							key={id}
						>
							{item.frontMatter.id > 0 ? (
								<Link href={posts[item.frontMatter.id - 1].slug}>
									<IconComponent>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
										/>
									</IconComponent>
									{posts[item.frontMatter.id - 1].frontMatter.title}
								</Link>
							) : null}
							{item.frontMatter.id < posts.length - 1 ? (
								<Link href={posts[item.frontMatter.id + 1].slug}>
									{posts[item.frontMatter.id + 1].frontMatter.title}

									<IconComponent>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
										/>
									</IconComponent>
								</Link>
							) : null}
						</div>
					);
				})}
		</React.Fragment>
	);
};

export default Links;

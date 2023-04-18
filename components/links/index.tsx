import React from 'react';

import Image from 'next/dist/client/image';
import Link from 'next/dist/client/link';

import { usePathname } from 'next/navigation';

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
								<Link
									href={posts[item.frontMatter.id - 1].slug}
									className={styles.left}
								>
									<Image
										src="/docs/arrow_left.svg"
										width={24}
										height={24}
										alt="arrow_left"
									></Image>
									{posts[item.frontMatter.id - 1].frontMatter.title}
								</Link>
							) : null}
							{item.frontMatter.id < posts.length - 1 ? (
								<Link
									href={posts[item.frontMatter.id + 1].slug}
									className={styles.right}
								>
									{posts[item.frontMatter.id + 1].frontMatter.title}
									<Image
										src="/docs/arrow_right.svg"
										width={24}
										height={24}
										alt="arrow_right"
									></Image>
								</Link>
							) : null}
						</div>
					);
				})}
		</React.Fragment>
	);
};

export default Links;

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import Image from 'next/image';

import Content from '../content/about.mdx';

import slug from '@/api/slug.json';

import styles from './page.module.scss';

const DocsPage = () => {
	const router = usePathname();

	return (
		<div className={styles.page_content}>
			<div className={styles.time_info}>
				<span>Last updated on April 10, 2023</span>
				<span> 1 min read</span>
			</div>

			{/* {slug
					.filter((title) => title.url === router)
					.map((title) => {
						return title.title;
					})} */}

			<Content />

			<p>*there should be some text*.</p>

			<React.Fragment>
				{slug
					.filter((title) => title.url === router)
					.map((item, id) => {
						return (
							<div
								className={styles.links}
								style={{ justifyContent: `${item.id === 0 && 'flex-end'}` }}
								key={id}
							>
								{item.id > 0 ? (
									<Link href={slug[item.id - 1].url} className={styles.left}>
										<Image
											src="/docs/arrow_left.svg"
											width={24}
											height={24}
											alt="arrow_left"
										></Image>
										{slug[item.id - 1].title}
									</Link>
								) : null}
								{item.id < slug.length - 1 ? (
									<Link href={slug[item.id + 1].url} className={styles.right}>
										{slug[item.id + 1].title}
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
		</div>
	);
};

export default DocsPage;

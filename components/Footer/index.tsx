'use client';

import type { FC } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import useScrollToTop from '@/hooks/useScrollToTop';

import { footerLinks } from './links';

import styles from './index.module.scss';

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<nav>
				<div className={styles.footer_group}>
					<Link href="/" onClick={useScrollToTop()} className={styles.logo}>
						ONARA
					</Link>
				</div>

				{footerLinks.map((group) => (
					<div className={styles.footer_group} key={group.title}>
						<h2>{group.title}</h2>
						<div className={styles.footer_list}>
							{group.links.map(({ href, label }) => (
								<Link href={href} key={label}>
									{label}
								</Link>
							))}
						</div>
					</div>
				))}
			</nav>
			<div className={styles.footer_wrapper}>
				<div id={styles.mobile_logo}>
					<Link href="/" onClick={useScrollToTop()} className={styles.logo}>
						ONARA
					</Link>
				</div>

				<span>
					Copyright © {new Date().getFullYear()} ONARA Inc. All rights reserved.
				</span>

				<div className={styles.social}>
					<Link href="https://github.com/Attato/Onara">
						<Image
							src="/icons/services/github.svg"
							width={19}
							height={19}
							alt="github"
						/>
					</Link>
					<hr />
					<Link href="https://t.me/qwaqwakwa">
						<Image
							src="/icons/services/telegram.svg"
							width={19}
							height={19}
							alt="telegram"
						/>
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

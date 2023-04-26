'use client';

import type { FC } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import useScrollToTop from '@/hooks/scrollToTop';

import styles from './index.module.scss';

const Footer: FC = () => {
	const productLinks = [
		{ href: '/docs/release-notes', label: 'Release Notes' },
		{ href: '/docs/security', label: 'Security' },
		{ href: '/', label: 'Sitemap' },
		{ href: '/', label: 'What is Onara?' },
	];

	const resourcesLinks = [
		{ href: '/docs/introduction', label: 'Documentation' },
		{ href: '/docs/user-guide', label: 'User Guide' },
		{ href: '/help', label: 'Help' },
		{ href: '/', label: 'Open Source Software' },
	];

	const companyLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/feedback', label: 'Feedback' },
		{ href: '/', label: 'Contact Us' },
	];

	const policyLinks = [
		{ href: '/', label: 'Privacy Policy' },
		{ href: '/', label: 'Terms of Service' },
		{ href: '/', label: 'Cookie Preferences' },
		{ href: '/docs/legal-licensing', label: 'License' },
	];

	const footerLinks = [
		{ title: 'Product', links: productLinks },
		{ title: 'Resources', links: resourcesLinks },
		{ title: 'Company', links: companyLinks },
		{ title: 'Policies', links: policyLinks },
	];

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
							src="/icons/github.svg"
							width={19}
							height={19}
							alt="github"
						/>
					</Link>
					<hr />
					<Link href="https://t.me/qwaqwakwa">
						<Image
							src="/icons/telegram.svg"
							width={19}
							height={19}
							alt="github"
						/>
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

'use client';

import { useEffect } from 'react';
import type { FC } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import styles from './header.module.scss';

const Header: FC = () => {
	useEffect(() => {
		const handleScroll = () => {
			const header = document.querySelector('header');
			if (header) {
				// добавляем проверку на null
				if (window.pageYOffset > 0) {
					header.classList.add(styles.scrolled);
				} else {
					header.classList.remove(styles.scrolled);
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header className={styles.header_wrapper}>
			<div className={styles.header}>
				<div className={styles.header_nav_first}>
					<Link href="/" className={styles.logo}>
						<Image src="/icon.svg" width={32} height={32} alt="img" />
					</Link>
				</div>

				<div className={styles.header_nav_second}>
					<div className={styles.navigation_menu}>
						<Link href="/docs">Showcase</Link>
						<Link href="/docs">Docs</Link>
					</div>
				</div>

				<div className={styles.header_nav_third}>*user logo*</div>
			</div>
		</header>
	);
};

export default Header;

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

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<header className={styles.header_wrapper}>
			<div className={styles.header}>
				<div className={styles.header_nav_first}>
					<Link href="/" onClick={scrollToTop} className={styles.logo}>
						<Image
							src="/icon.svg"
							width={90}
							height={15}
							alt="img"
							draggable={false}
						/>
					</Link>
				</div>

				<div className={styles.header_nav_second}>
					<div className={styles.navigation_menu}>
						<Link href="/showcase">Showcase</Link>
						<Link href="/docs">Docs</Link>
						<Link href="/feedback">Feedback</Link>
						<Link href="/help">Help</Link>
					</div>
				</div>

				<div className={styles.header_nav_third}>
					<Link href="/">Sign in</Link>

					<Link href="/">
						Sign up
						<Image src="/signin.svg" width={14} height={14} alt="sign in" />
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;

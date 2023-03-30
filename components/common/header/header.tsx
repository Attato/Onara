'use client';

import { useEffect } from 'react';
import type { FC } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import BurgerMenu from '@/components/burgerMenu/burgerMenu';

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

	console.info('Have a great day! 🌳🐇🌻');

	return (
		<header className={styles.header_wrapper}>
			<div className={styles.header}>
				<div className={styles.header_nav_first}>
					<Link href="/" onClick={scrollToTop} className={styles.logo}>
						<Image
							src="/icon.svg"
							width={40}
							height={40}
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
					<Link href="/login" className={styles.signin}>
						Sign in
					</Link>

					<Link href="/signup" className={styles.signup}>
						Sign up
						<Image src="/signin.svg" width={14} height={14} alt="sign in" />
					</Link>

					<BurgerMenu
						menuItems={[
							{ href: '/showcase', label: 'Showcase' },
							{ href: '/docs', label: 'Docs' },
							{ href: '/feedback', label: 'Feedback' },
							{ href: '/help', label: 'Help' },
						]}
					/>
				</div>
			</div>
		</header>
	);
};

export default Header;

'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import BurgerMenu from '@/components/common/header/burgerMenu/burgerMenu';

import useScrollToTop from '@/hooks/scrollToTop';

import styles from './header.module.scss';

const Header: React.FC = () => {
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

	const links = [
		{ href: '/showcase', label: 'Showcase' },
		{ href: '/docs/introduction', label: 'Docs' },
		{ href: '/feedback', label: 'Feedback' },
		{ href: '/help', label: 'Help' },
	];

	return (
		<header className={styles.header_wrapper}>
			<div className={styles.header}>
				<div className={styles.header_nav_first}>
					<Link href="/" onClick={useScrollToTop()} className={styles.logo}>
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
						{links.map((link) => {
							return (
								<Link key={link.href} href={link.href}>
									{link.label}
								</Link>
							);
						})}
					</div>
				</div>

				<div className={styles.header_nav_third}>
					<Link href="/auth/signin" className={styles.signin}>
						Sign in
					</Link>

					<Link href="/auth/signup" className={styles.signup}>
						Sign up
						<Image
							src="/components/common/header/signin.svg"
							width={14}
							height={14}
							alt="sign in"
						/>
					</Link>

					<BurgerMenu menuItems={links} />
				</div>
			</div>
		</header>
	);
};

export default Header;

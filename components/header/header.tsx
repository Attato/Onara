'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { useSession, signOut } from 'next-auth/react';

import BurgerMenu from '@/components/header/burgerMenu/burgerMenu';
import Dropdown from '@/components/dropdown/dropdown';

import useScrollToTop from '@/hooks/scrollToTop';

import styles from './header.module.scss';

const Header: React.FC = () => {
	useEffect(() => {
		const handleScroll = () => {
			const header = document.querySelector('header');

			if (header) {
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
		{ href: '/about', label: 'About' },
		{ href: '/docs/introduction', label: 'Docs' },
		{ href: '/feedback', label: 'Feedback' },
		{ href: '/help', label: 'Help' },
	];

	const { data, status } = useSession();

	const options = [
		{ label: 'Profile', href: '/' },
		{ label: 'Repositories', href: '/about' },
		{ label: 'Friends', href: '/about' },
		{ label: 'Settings', href: '/settings' },
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

				{status === 'authenticated' ? (
					<div className={styles.header_nav_third}>
						<Dropdown
							label={
								<Image
									src={`${data.user?.image}`}
									width={32}
									height={32}
									alt={data.user?.name + ' logo'}
								/>
							}
						>
							<Link href="/" className={styles.user}>
								<p>
									Signed in as <span>{data.user?.name}</span>
								</p>
								<p className={styles.user_email}>{data.user?.email}</p>
							</Link>
							<hr />
							{options.map((option) => (
								<Link href={option.href} key={option.label} role="menuitem">
									{option.label}
								</Link>
							))}
							<hr />
							<button onClick={() => signOut()}>
								Sign out
								<Image
									src="/icons/enter-exit.svg"
									width={14}
									height={14}
									alt="sign in"
								/>
							</button>
						</Dropdown>
						<BurgerMenu menuItems={links} />
					</div>
				) : null}

				{status === 'unauthenticated' ? (
					<div className={styles.header_nav_third}>
						<Link href="/auth/signin" className={styles.signin}>
							Sign in
						</Link>

						<Link href="/auth/signup" className={styles.signup}>
							Sign up
							<Image
								src="/icons/enter-exit.svg"
								width={14}
								height={14}
								alt="sign in"
							/>
						</Link>

						<BurgerMenu menuItems={links} />
					</div>
				) : null}
			</div>
		</header>
	);
};

export default Header;

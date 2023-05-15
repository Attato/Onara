'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { useSession, signOut } from 'next-auth/react';

import BurgerMenu from '@/components/Header/BurgerMenu';
import Dropdown from '@/components/Dropdown';

import useScrollToTop from '@/hooks/useScrollToTop';

import styles from './index.module.scss';
import IconComponent from '../IconComponent';

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
		{ href: '/features', label: 'Features' },
		{ href: '/changelog', label: 'Changelog' },
		{ href: '/docs/introduction', label: 'Docs' },
		{ href: '/feedback', label: 'Feedback' },
	];

	const { data, status } = useSession();

	const options = [
		{
			image: (
				<IconComponent>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</IconComponent>
			),
			label: 'Profile',
			href: '/',
		},
		{
			image: (
				<IconComponent>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
					/>
				</IconComponent>
			),
			label: 'Repositories',
			href: '/',
		},
		{
			image: (
				<IconComponent>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
					/>
				</IconComponent>
			),
			label: 'Friends',
			href: '/',
		},
		{
			image: (
				<IconComponent>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</IconComponent>
			),
			label: 'Settings',
			href: '/',
		},
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

							{options.map((option) => (
								<Link
									href={option.href}
									role="menuitem"
									className={styles.option}
									key={option.label}
								>
									<span>{option.label}</span>
									{option.image}
								</Link>
							))}

							<button onClick={() => signOut()} className={styles.btn}>
								Sign out
								<IconComponent>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
									/>
								</IconComponent>
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
								src="/icons/auth/signout.svg"
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

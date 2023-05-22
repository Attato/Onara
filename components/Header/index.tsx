import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { useSession, signOut } from 'next-auth/react';

import BurgerMenu from '@/components/BurgerMenu';
import Dropdown from '@/components/Dropdown';
import IconWrapper from '@/components/IconWrapper';

import AuthorizationPopup from '@/components/_Templates/AuthorizationPopup';

import useScrollToTop from '@/hooks/useScrollToTop';

import { links } from '@/data/components/header/links';
import { options } from '@/data/components/header/options';

import styles from './index.module.scss';

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

	const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);

	const openPopup = () => {
		setIsPopupOpen(!isPopupOpen);
	};

	const closePopup = () => {
		setIsPopupOpen(false);
	};

	const closeBurgerMenu = () => {
		setTimeout(() => {
			setIsBurgerMenuOpen(!isBurgerMenuOpen);
		}, 100);
	};

	const { data, status } = useSession();

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
								<Link
									href={link.href}
									key={link.href}
									target={link.label === 'Feedback' ? `_blank` : ''}
								>
									{link.label}
									{link.label === 'Feedback' && (
										<IconWrapper width={14} height={14}>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
											/>
										</IconWrapper>
									)}
								</Link>
							);
						})}
					</div>
				</div>

				{status === 'authenticated' && (
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
								<IconWrapper>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
									/>
								</IconWrapper>
							</button>
						</Dropdown>

						<BurgerMenu
							isBurgerMenuOpen={isBurgerMenuOpen}
							closeBurgerMenu={closeBurgerMenu}
						>
							<div className={styles.burgerMenu_user_wrap}>
								<Link
									href="/"
									onClick={closeBurgerMenu}
									className={styles.burgerMenu_user}
								>
									<p>Signed in as {data.user?.name}</p>
									<Image
										src={`${data.user?.image}`}
										width={32}
										height={32}
										alt={data.user?.name + ' logo'}
									/>
								</Link>

								{options.map((option) => (
									<Link
										href={option.href}
										role="menuitem"
										className={styles.burgerMenu_option}
										key={option.label}
									>
										<span>{option.label}</span>
										{option.image}
									</Link>
								))}
							</div>

							<button
								onClick={() => signOut()}
								className={styles.burgerMenu_exit_btn}
							>
								Sign out
								<IconWrapper>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
									/>
								</IconWrapper>
							</button>

							<h4 className={styles.burgerMenu_link_title}>Pages</h4>
							{links.map((menuItem) => (
								<Link
									href={menuItem.href}
									key={menuItem.label}
									className={styles.burgerMenu_link}
									target={menuItem.label === 'Feedback' ? `_blank` : ''}
								>
									{menuItem.label}
									{menuItem.label === 'Feedback' && (
										<IconWrapper>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
											/>
										</IconWrapper>
									)}
								</Link>
							))}
						</BurgerMenu>
					</div>
				)}

				{status === 'unauthenticated' && (
					<div className={styles.header_nav_third}>
						<button onClick={openPopup} className={styles.signin}>
							Sign in
							<IconWrapper width={14} height={14}>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 8.25l-7.5 7.5-7.5-7.5"
								/>
							</IconWrapper>
						</button>

						<AuthorizationPopup
							isPopupOpen={isPopupOpen}
							popupOnClose={closePopup}
							title="Log in"
						/>

						<BurgerMenu
							isBurgerMenuOpen={isBurgerMenuOpen}
							closeBurgerMenu={closeBurgerMenu}
						>
							{links.map((links) => (
								<Link
									href={links.href}
									key={links.label}
									className={styles.burgerMenu_link}
									target={links.label === 'Feedback' ? `_blank` : ''}
								>
									{links.label}
									{links.label === 'Feedback' && (
										<IconWrapper>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
											/>
										</IconWrapper>
									)}
								</Link>
							))}
						</BurgerMenu>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;

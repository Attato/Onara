import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { useSession, signOut } from 'next-auth/react';

import BurgerMenu from '@/components/BurgerMenu';
import Dropdown from '@/components/Dropdown';

import {
	ArrowTopRightOnSquareIcon,
	ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/solid';

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

	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);

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
										<ArrowTopRightOnSquareIcon width={14} height={14} />
									)}
								</Link>
							);
						})}
					</div>
				</div>

				{status === 'authenticated' && (
					<div className={styles.header_nav_third}>
						<div className={styles.dropdown}>
							<Dropdown
								buttonContent={
									<React.Fragment>
										<Image
											src={`${data.user?.image}`}
											width={32}
											height={32}
											alt={data.user?.name + ' logo'}
										/>
									</React.Fragment>
								}
								positionAbsolute={true}
							>
								{options.map((option) => (
									<Link
										href={option.href}
										role="menuitem"
										className={
											option.label === 'Sign out'
												? styles.signout
												: styles.option
										}
										key={option.label}
										onClick={() => option.label === 'Sign out' && signOut()}
									>
										<span>{option.label}</span>
										{option.image}
									</Link>
								))}
							</Dropdown>
						</div>

						<BurgerMenu
							isBurgerMenuOpen={isBurgerMenuOpen}
							closeBurgerMenu={closeBurgerMenu}
						>
							<div className={styles.burgerMenu_user_wrap}>
								{options.map(
									(option) =>
										option.label !== 'Sign out' && (
											<Link
												href={option.href}
												role="menuitem"
												className={styles.burgerMenu_option}
												key={option.label}
											>
												<span>{option.label}</span>
												{option.image}
											</Link>
										)
								)}
							</div>

							<button
								onClick={() => signOut()}
								className={styles.burgerMenu_exit_btn}
							>
								Sign out <ArrowRightOnRectangleIcon width={16} height={16} />
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
										<ArrowTopRightOnSquareIcon width={14} height={14} />
									)}
								</Link>
							))}
						</BurgerMenu>
					</div>
				)}

				{status === 'unauthenticated' && (
					<div className={styles.header_nav_third}>
						<AuthorizationPopup
							title="Log in"
							buttonContent={
								<button className={styles.signin}>
									Sign in
									<ArrowRightOnRectangleIcon width={16} height={16} />
								</button>
							}
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
										<ArrowTopRightOnSquareIcon width={14} height={14} />
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

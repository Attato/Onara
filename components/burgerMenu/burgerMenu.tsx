import { useState } from 'react';
import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import styles from './burgerMenu.module.scss';

interface MenuItem {
	href: string;
	label: string;
}

interface BurgerMenuProps {
	menuItems: MenuItem[];
}

const BurgerMenu: FC<BurgerMenuProps> = ({ menuItems }) => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);

		if (!open) {
			document.body.classList.add(styles.disabled_scrolling);
		} else {
			document.body.classList.remove(styles.disabled_scrolling);
		}
	};

	return (
		<div className={styles.burger_menu}>
			<button className={styles.burger_menu__button} onClick={handleClick}>
				<Image
					src="/components/burgerMenu/burgerMenu.svg"
					width={20}
					height={20}
					alt="burger menu"
				></Image>
			</button>
			<div className={open ? styles.open_links : styles.close_links}>
				{menuItems.map((menuItem) => (
					<Link
						href={menuItem.href}
						key={menuItem.label}
						onClick={handleClick}
						className={styles.open_link}
					>
						{menuItem.label}
					</Link>
				))}

				<Link href="/login" className={styles.signin} onClick={handleClick}>
					Sign In
				</Link>
			</div>
		</div>
	);
};

export default BurgerMenu;

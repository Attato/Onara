import { useState } from 'react';
import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useSession } from 'next-auth/react';

import styles from './index.module.scss';

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
		setTimeout(() => {
			setOpen(!open);

			if (!open) {
				document.body.classList.add(styles.disabled_scrolling);
			} else {
				document.body.classList.remove(styles.disabled_scrolling);
			}
		}, 100);
	};

	const { data, status } = useSession();

	return (
		<>
			<button className={styles.burger_menu__button} onClick={handleClick}>
				<Image
					src="/icons/burger_menu.svg"
					width={20}
					height={20}
					alt="burger menu"
				></Image>
			</button>

			<div className={open ? styles.content : styles.close_content}>
				{status === 'authenticated' ? (
					<>
						<Link href="/" className={styles.user} onClick={handleClick}>
							<Image
								src={`${data.user?.image}`}
								width={32}
								height={32}
								alt={data.user?.name + ' logo'}
							/>
							<p>{data.user?.name}</p>
						</Link>
					</>
				) : null}

				{menuItems.map((menuItem) => (
					<Link href={menuItem.href} key={menuItem.label} onClick={handleClick}>
						{menuItem.label}
					</Link>
				))}

				{status === 'authenticated' ? null : (
					<Link
						href="/auth/signin"
						className={styles.signin}
						onClick={handleClick}
					>
						Sign In
					</Link>
				)}
			</div>
		</>
	);
};

export default BurgerMenu;

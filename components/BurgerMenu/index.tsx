import { useState } from 'react';
import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useSession } from 'next-auth/react';

import IconWrapper from '@/components/IconWrapper';

import useDisableScroll from '@/hooks/useDisableScroll';

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

	useDisableScroll(open);

	const handleClick = () => {
		setTimeout(() => {
			setOpen(!open);
		}, 100);
	};

	const { data, status } = useSession();

	return (
		<>
			<button className={styles.burger_menu__button} onClick={handleClick}>
				{open ? (
					<IconWrapper width={24} height={24} strokeWidth={1.5}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
						/>
					</IconWrapper>
				) : (
					<IconWrapper width={24} height={24} strokeWidth={1.5}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
						/>
					</IconWrapper>
				)}
			</button>

			<div className={open ? styles.content : styles.close_content}>
				{status === 'authenticated' && (
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
				)}

				{menuItems.map((menuItem) => (
					<Link
						href={menuItem.href}
						key={menuItem.label}
						className={styles.burger_link}
						onClick={handleClick}
					>
						{menuItem.label}
					</Link>
				))}
			</div>
		</>
	);
};

export default BurgerMenu;

import React from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/24/solid';
import useDisableScroll from '@/hooks/useDisableScroll';

import styles from './index.module.scss';

interface BurgerMenuProps {
	children: React.ReactNode;
	isBurgerMenuOpen: boolean;
	closeBurgerMenu: () => void;
	title?: React.ReactNode;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({
	children,
	isBurgerMenuOpen,
	closeBurgerMenu,
	title = (
		<motion.div
			initial={false}
			animate={isBurgerMenuOpen ? 'open' : 'closed'}
			transition={{
				duration: 0.2,
				ease: 'easeIn',
			}}
			className={styles.burger_menu_icon}
		>
			<AnimatePresence>
				{isBurgerMenuOpen ? (
					<BarsArrowUpIcon width={24} height={24} />
				) : (
					<BarsArrowDownIcon width={24} height={24} />
				)}
			</AnimatePresence>
		</motion.div>
	),
}) => {
	useDisableScroll(isBurgerMenuOpen);

	const variants = {
		open: { opacity: 1, y: 0 },
		closed: { opacity: 0, y: -20 },
	};

	return (
		<React.Fragment>
			<button className={styles.burger_menu__button} onClick={closeBurgerMenu}>
				{title}
			</button>

			<AnimatePresence>
				{isBurgerMenuOpen && (
					<motion.div
						className={styles.content}
						initial="closed"
						animate="open"
						exit="closed"
						variants={variants}
						onClick={closeBurgerMenu}
						transition={{ ease: 'easeInOut', duration: 0.2 }}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</React.Fragment>
	);
};

export default BurgerMenu;

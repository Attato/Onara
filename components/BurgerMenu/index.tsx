import React from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import IconWrapper from '@/components/IconWrapper';

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
			<IconWrapper width={24} height={24} strokeWidth={1.5}>
				<AnimatePresence>
					{isBurgerMenuOpen ? (
						<motion.path
							key="open"
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						/>
					) : (
						<motion.path
							key="closed"
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						/>
					)}
				</AnimatePresence>
			</IconWrapper>
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
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</React.Fragment>
	);
};

export default BurgerMenu;

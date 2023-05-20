import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import IconWrapper from '@/components/IconWrapper';

import styles from './index.module.scss';

type PopupProps = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title?: string;
};

const Popup: React.FC<PopupProps> = ({
	isOpen,
	onClose,
	children,
	title = 'Untitled',
}) => {
	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	const popupVariants = {
		hidden: { opacity: 0, scale: 0.7 },
		visible: { opacity: 1, scale: 1 },
	};

	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className={styles.popup_overlay}
					initial="hidden"
					animate={isOpen ? 'visible' : 'hidden'}
					exit="hidden"
					variants={overlayVariants}
					onClick={onClose}
				>
					<motion.div
						className={styles.popup}
						initial="hidden"
						animate={isOpen ? 'visible' : 'hidden'}
						exit="hidden"
						variants={popupVariants}
						onClick={handleOverlayClick}
					>
						<div className={styles.title}>
							<h2>{title}</h2>
							<button className={styles.close} onClick={onClose}>
								<IconWrapper width={20} height={20}>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</IconWrapper>
							</button>
						</div>
						<div className={styles.content}>{children}</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Popup;

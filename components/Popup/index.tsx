import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { WrenchScrewdriverIcon, XMarkIcon } from '@heroicons/react/24/outline';
import styles from './index.module.scss';

type PopupProps = {
	buttonContent?: React.ReactNode;
	title?: string;
	children?: React.ReactNode;
};

const Popup: React.FC<PopupProps> = ({
	buttonContent = (
		<button id={styles.blank_button}>
			Blank popup <WrenchScrewdriverIcon width={16} height={16} />
		</button>
	),
	title = 'Untitled',
	children = <p id={styles.blank_content}>Popup without text</p>,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const openPopup = useCallback(() => {
		setIsOpen(true);
	}, []);

	const closePopup = useCallback(() => {
		setIsOpen(false);
	}, []);

	const handleOverlayClick = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			event.stopPropagation();
		},
		[]
	);

	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	const popupVariants = {
		hidden: { opacity: 0, scale: 0.7 },
		visible: { opacity: 1, scale: 1 },
	};

	return (
		<React.Fragment>
			<div onClick={openPopup} className={styles.popup_opener_button}>
				{buttonContent}
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className={styles.popup_overlay}
						initial="hidden"
						animate={isOpen ? 'visible' : 'hidden'}
						exit="hidden"
						variants={overlayVariants}
						onClick={closePopup}
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
								<button className={styles.close} onClick={closePopup}>
									<XMarkIcon width={20} height={20} />
								</button>
							</div>
							<div className={styles.content}>{children}</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</React.Fragment>
	);
};

export default Popup;

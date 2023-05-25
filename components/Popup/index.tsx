import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IconWrapper from '@/components/IconWrapper';
import styles from './index.module.scss';

type PopupProps = {
	buttonContent?: React.ReactNode;
	title?: string;
	children?: React.ReactNode;
};

const Popup: React.FC<PopupProps> = ({
	buttonContent = (
		<button id={styles.blank_button}>
			Blank popup
			<IconWrapper>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
				/>
			</IconWrapper>
		</button>
	),
	title = 'Untitled',
	children = (
		<p id={styles.blank_content}>
			The legend states that only a skilled programmer can decipher this block
			and unlock its true potential. A majestic Popup window, shrouded in
			mysteries and enigmas, stands before you, enticing you with its emptiness.
			But do not be deceived by its vacant contents, for within the depths of
			this popup lie great possibilities yearning to be set free. At first
			glance, it may appear as a mere empty block, but only the discerning eyes
			can penetrate its essence and imbue it with boundless ideas. Your journey
			begins here, and now you are tasked with writing a story that will fill
			this popup and unveil its entire potential. Your skills, knowledge, and
			creative spirit are the keys to transforming this enigmatic void into
			something marvelous, captivating, and perhaps revolutionary. It is time to
			embrace the challenge and dance with the magic of code, revealing all that
			is hidden within this empty popup.
		</p>
	),
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
		</React.Fragment>
	);
};

export default Popup;

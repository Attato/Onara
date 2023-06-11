import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { WrenchScrewdriverIcon, XMarkIcon } from '@heroicons/react/24/outline';

type PopupProps = {
	buttonContent?: React.ReactNode;
	title?: string;
	children?: React.ReactNode;
};

const Popup: React.FC<PopupProps> = ({
	buttonContent = (
		<button>
			Blank popup <WrenchScrewdriverIcon width={16} height={16} />
		</button>
	),
	title = 'Untitled',
	children = <p>Popup without text</p>,
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
			<div onClick={openPopup} className="bg-transparent h-fit max-w-[220px]">
				{buttonContent}
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="fixed top-0 left-0 w-full h-full backdrop-blur-[6px] flex items-center justify-center z-10 cursor-pointer"
						initial="hidden"
						animate={isOpen ? 'visible' : 'hidden'}
						exit="hidden"
						variants={overlayVariants}
						onClick={closePopup}
					>
						<motion.div
							className="w-full h-fit bg-backgroundSecondary rounded-lg max-w-lg z-10 cursor-default"
							initial="hidden"
							animate={isOpen ? 'visible' : 'hidden'}
							exit="hidden"
							variants={popupVariants}
							onClick={handleOverlayClick}
							transition={{ ease: 'easeInOut', duration: 0.3 }}
						>
							<div className="p-8 text-colorPrimary rounded-xl">
								{children}

								<button
									className="p-2 border border-borderColor hover:bg-backgroundSecondaryHover rounded-md mt-6 ml-auto w-2/4 font-medium text-sm flex items-center justify-center"
									onClick={closePopup}
								>
									Cancel
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</React.Fragment>
	);
};

export default Popup;

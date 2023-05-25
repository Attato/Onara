import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import Link from 'next/link';

import IconWrapper from '@/components/IconWrapper';

import styles from './index.module.scss';

type DropdownProps = {
	title?: React.ReactNode;
	buttonContent: React.ReactNode;
	children: React.ReactNode;
	positionAbsolute?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
	buttonContent,
	children,
	positionAbsolute = false,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles.dropdown}>
			<motion.button onClick={toggleDropdown} className={styles.dropdown_btn}>
				{buttonContent}

				<IconWrapper>
					<motion.path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M19.5 8.25l-7.5 7.5-7.5-7.5"
						animate={{
							rotate: isOpen ? 180 : 0,
						}}
						transition={{ duration: 0.3 }}
					/>
				</IconWrapper>
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className={styles.dropdown_open}
						style={positionAbsolute ? { position: 'absolute' } : undefined}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Dropdown;

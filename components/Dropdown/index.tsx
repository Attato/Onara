import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import styles from './index.module.scss';

type DropdownProps = {
	buttonContent: React.ReactNode;
	children: React.ReactNode;
	positionAbsolute?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
	buttonContent = 'Empty',
	children,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleOutsideClick);
		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, []);

	return (
		<div ref={dropdownRef} className={styles.dropdown}>
			<motion.button onClick={toggleDropdown} className={styles.dropdown_btn}>
				{buttonContent}
				<ChevronDownIcon width={16} height={16} strokeWidth={1.5} />
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className={styles.dropdown_open}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Dropdown;

import { useState, useEffect, useRef, ReactNode } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import IconComponent from '@/components/IconComponent';

import styles from './index.module.scss';

interface DropdownProps {
	children: ReactNode;
	label: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ children, label }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

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

	const handleDropdownToggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles.dropdown} ref={dropdownRef}>
			<button
				onClick={handleDropdownToggle}
				type="button"
				className={styles.dropdown_btn}
				aria-haspopup="true"
				aria-expanded="true"
			>
				{label}
				<IconComponent width={14} height={14}>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M19.5 8.25l-7.5 7.5-7.5-7.5"
					/>
				</IconComponent>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className={styles.dropdown_open}
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="options-menu"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Dropdown;

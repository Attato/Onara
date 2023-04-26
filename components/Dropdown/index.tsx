import { useState, useEffect, useRef, ReactNode } from 'react';

import Image from 'next/image';

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
				<Image
					src="/icons/arrow_down.svg"
					width={12}
					height={8}
					alt="arrow down"
					className={isOpen ? styles.arrow_open : styles.arrow}
				/>
			</button>

			{isOpen && (
				<div
					className={styles.dropdown_open}
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="options-menu"
				>
					{children}
				</div>
			)}
		</div>
	);
};

export default Dropdown;

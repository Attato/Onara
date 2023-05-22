import React, { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Link from 'next/link';

import IconWrapper from '@/components/IconWrapper';

import useScrollToTop from '@/hooks/useScrollToTop';

import { footerLinks } from '@/data/components/footer/links';

import styles from './index.module.scss';

const Footer: FC = () => {
	const [openSections, setOpenSections] = useState<number[]>([]);

	const toggleSection = (index: number) => {
		if (openSections.includes(index)) {
			setOpenSections(
				openSections.filter((sectionIndex) => sectionIndex !== index)
			);
		} else {
			setOpenSections([...openSections, index]);
		}
	};

	return (
		<footer className={styles.footer}>
			<nav>
				{footerLinks.map((group, index) => (
					<div className={styles.footer_group} key={group.title}>
						<motion.h2 onClick={() => toggleSection(index)}>
							{group.title}
							<IconWrapper>
								{/* Apply the rotation animation to the path */}
								<motion.path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									animate={{
										rotate: openSections.includes(index) ? 180 : 0,
									}}
									transition={{ duration: 0.3 }}
								/>
							</IconWrapper>
						</motion.h2>

						<AnimatePresence>
							{openSections.includes(index) && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.3 }}
									className={styles.footer_list}
									style={{ overflow: 'hidden' }}
								>
									{group.links.map(({ href, label }) => (
										<Link href={href} key={label}>
											{label}
										</Link>
									))}
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				))}
			</nav>
			<div className={styles.footer_wrapper}>
				<div className={styles.logo}>
					<Link href="/" onClick={useScrollToTop()} className={styles.logo}>
						ONARA
					</Link>
				</div>

				<motion.span
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					&copy; {new Date().getFullYear()} ONARA Inc. All rights reserved.
				</motion.span>
			</div>
		</footer>
	);
};

export default Footer;

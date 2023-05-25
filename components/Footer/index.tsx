import React, { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Link from 'next/link';

import IconWrapper from '@/components/IconWrapper';
import Dropdown from '@/components/Dropdown'; // Import the Dropdown component

import useScrollToTop from '@/hooks/useScrollToTop';

import { footerLinks } from '@/data/components/footer/links';

import styles from './index.module.scss';

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<nav>
				{footerLinks.map((group, index) => (
					<div className={styles.footer_group} key={index}>
						<Dropdown buttonContent={group.title}>
							<div className={styles.footer_list}>
								{group.links.map((link, index) => (
									<Link key={index} href={link.href}>
										{link.label}
									</Link>
								))}
							</div>
						</Dropdown>
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

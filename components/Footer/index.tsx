import React, { FC } from 'react';
import { motion } from 'framer-motion';

import Link from 'next/link';

import styles from './index.module.scss';

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footer_wrapper}>
				<div className={styles.logo}>
					<Link href="/" className={styles.logo}>
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

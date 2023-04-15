'use client';

import Link from 'next/link';

import { usePathname, useRouter } from 'next/navigation';

import slug from '@/api/slug.json';
import styles from './layout.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<main className="main">
			<div className={styles.slug}>
				<div className={styles.sidebar}>
					{slug.map((link, index) => {
						const isActive = pathname === link.url;

						return (
							<Link
								href={link.url}
								key={index}
								className={isActive ? styles.activeLink : ''}
								draggable={false}
							>
								{link.title}
							</Link>
						);
					})}
				</div>
				{children}
			</div>
		</main>
	);
};

export default Layout;

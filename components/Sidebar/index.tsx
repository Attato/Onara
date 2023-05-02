import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './index.module.scss';

const SideBar = ({ posts }: any) => {
	const pathname = usePathname();

	return (
		<div className={styles.sidebar}>
			{posts
				.sort((a: any, b: any) => a.frontMatter.id - b.frontMatter.id)
				.map((link: any, id: number) => {
					const isActive = pathname === `/docs/${link.slug}`;

					return (
						<Link
							href={link.slug}
							key={id}
							className={isActive ? styles.activeLink : ''}
							draggable={false}
						>
							{link.frontMatter.title}
						</Link>
					);
				})}
		</div>
	);
};

export default SideBar;

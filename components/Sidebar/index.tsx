import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Post } from '@/pages/docs/[slug]';

import styles from './index.module.scss';

interface SidebarProps {
	posts: Post[];
}

const Sidebar: React.FC<SidebarProps> = ({ posts }) => {
	const pathname = usePathname();

	const sortedPosts = [...posts].sort(
		(a, b) => a.frontMatter.id - b.frontMatter.id
	);

	const categories = sortedPosts.reduce((categories, post) => {
		const category = post.frontMatter.category;
		const isActive = pathname === `/docs/${post.slug}`;

		categories[category] = categories[category] || [];
		categories[category].push(
			<Link
				key={post.slug}
				href={`/docs/${post.slug}`}
				className={isActive ? styles.activeLink : ''}
			>
				{post.frontMatter.title}
			</Link>
		);

		return categories;
	}, {} as { [category: string]: JSX.Element[] });

	return (
		<div className={styles.sidebar}>
			{Object.entries(categories).map(([category, links]) => (
				<div key={category} className={styles.category}>
					<h4>{category}</h4>
					{links}
				</div>
			))}
		</div>
	);
};

export default Sidebar;

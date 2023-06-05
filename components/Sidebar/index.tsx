import Link from 'next/link';

import { usePathname } from 'next/navigation';

import {
	UsersIcon,
	UserCircleIcon,
	UserGroupIcon,
	CloudIcon,
} from '@heroicons/react/24/outline';

import styles from './index.module.scss';

interface LinkItem {
	image: React.ReactNode;
	label: string;
	href: string;
}

interface SidebarProps {
	username: LinkItem[];
}

const Sidebar = ({ username }: SidebarProps) => {
	const pathname = usePathname();

	const links = [
		{
			image: <UserCircleIcon width={16} height={16} />,
			label: 'Profile',
			href: `/${username}`,
		},
		{
			image: <CloudIcon width={16} height={16} />,
			label: 'Repositories',
			href: `/${username}/repositories`,
		},
		{
			image: <UsersIcon width={16} height={16} />,
			label: 'Friends',
			href: `/${username}/friends`,
		},
		{
			image: <UserGroupIcon width={16} height={16} />,
			label: 'Groups',
			href: `/${username}/groups`,
		},
	];

	return (
		<div className={styles.sidebar}>
			{links.map((link: LinkItem) => {
				return (
					<Link
						href={link.href}
						className={
							pathname === `${link.href}` ? styles.active_link : styles.link
						}
						key={link.label}
					>
						{link.image}
						{link.label}
					</Link>
				);
			})}
		</div>
	);
};

export default Sidebar;

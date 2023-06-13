import Link from 'next/link';

import { usePathname } from 'next/navigation';

import {
	UsersIcon,
	UserCircleIcon,
	UserGroupIcon,
	CloudIcon,
} from '@heroicons/react/24/outline';

interface LinkItem {
	image: React.ReactNode;
	label: string;
	href: string;
}

interface TabsProps {
	username: LinkItem[];
}

const Tabs = ({ username }: TabsProps) => {
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
		<div className="flex gap-1 w-full text-colorSecondary dark:text-colorSecondaryDark select-none mt-12">
			{links.map((link: LinkItem) => {
				return (
					<Link
						href={link.href}
						className={`${
							pathname === link.href &&
							'text-slate-100 dark:text-slate-100 bg-indigo-600 dark:bg-indigo-600 hover:text-slate-100 hover:bg-indigo-600 hover:dark:bg-indigo-600'
						} flex items-center gap-3 hover:text-colorPrimary hover:dark:text-colorPrimaryDark hover:bg-backgroundSecondary hover:dark:bg-backgroundSecondaryDark h-fit text-sm font-medium px-3 py-1 rounded-md transition-all`}
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

export default Tabs;

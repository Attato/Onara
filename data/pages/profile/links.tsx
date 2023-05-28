import {
	UserCircleIcon,
	CloudIcon,
	UsersIcon,
} from '@heroicons/react/24/outline';

export const links = [
	{
		image: <UserCircleIcon width={16} height={16} />,
		label: 'Profile',
		href: '/',
	},
	{
		image: <CloudIcon width={16} height={16} />,
		label: 'Repositories',
		href: '/',
	},
	{
		image: <UsersIcon width={16} height={16} />,
		label: 'Friends',
		href: '/',
	},
];

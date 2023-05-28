import {
	UserCircleIcon,
	CloudIcon,
	UsersIcon,
	Cog6ToothIcon,
	ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

export const options = [
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
	{
		image: <Cog6ToothIcon width={16} height={16} />,
		label: 'Settings',
		href: '/',
	},
	{
		image: <ArrowRightOnRectangleIcon width={16} height={16} />,
		label: 'Sign out',
		href: '#',
	},
];

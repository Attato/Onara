interface Stack {
	href: string;
	imageSrc: string;
	title: string;
	description: string;
}

export const stacks: Stack[] = [
	{
		href: 'https://react.dev/',
		imageSrc: '/icons/stack/react.svg',
		title: 'React',
		description:
			'A free and open-source front-end JavaScript library for building user interfaces based on components.',
	},
	{
		href: 'https://nextjs.org/',
		imageSrc: '/icons/stack/next-js.svg',

		title: 'Next.js',
		description:
			'A free and open-source front-end JavaScript library for building user interfaces based on components.',
	},
	{
		href: 'https://vercel.com/',
		imageSrc: '/icons/stack/vercel.svg',
		title: 'Vercel',
		description:
			'A free and open-source front-end JavaScript library for building user interfaces based on components.',
	},
	{
		href: 'https://www.framer.com/',
		imageSrc: '/icons/stack/framer.svg',
		title: 'Framer',
		description:
			'A free and open-source front-end JavaScript library for building user interfaces based on components.',
	},
	{
		href: 'https://www.typescriptlang.org/',
		imageSrc: '/icons/stack/type_script.svg',
		title: 'TypeScript',
		description:
			'A free and open-source front-end JavaScript library for building user interfaces based on components.',
	},
];

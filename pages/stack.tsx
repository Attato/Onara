interface Stack {
	href: string;
	imageSrc: string;
	imageWidth: number;
	imageHeight: number;
	title: string;
	description: string;
}

export const stacks: Stack[] = [
	{
		href: 'https://react.dev/',
		imageSrc: '/icons/stack/react.svg',
		imageWidth: 50,
		imageHeight: 50,
		title: 'React',
		description:
			'A free and open-source front-end JavaScript library for building user interfaces based on components.',
	},
	{
		href: 'https://nextjs.org/',
		imageSrc: '/icons/stack/next-js.svg',
		imageWidth: 90,
		imageHeight: 50,
		title: 'Next.js',
		description:
			'A free and open-source front-end JavaScript library for building user interfaces based on components.',
	},
	{
		href: 'https://vercel.com/',
		imageSrc: '/icons/stack/vercel.svg',
		imageWidth: 115,
		imageHeight: 50,
		title: 'Vercel',
		description:
			'A free and open-source front-end JavaScript library for building user interfaces based on components.',
	},
	{
		href: 'https://www.framer.com/',
		imageSrc: '/icons/stack/framer.svg',
		imageWidth: 50,
		imageHeight: 50,
		title: 'Framer',
		description:
			'A free and open-source front-end JavaScript library for building user interfaces based on components.',
	},
	{
		href: 'https://www.typescriptlang.org/',
		imageSrc: '/icons/stack/type_script.svg',
		imageWidth: 50,
		imageHeight: 50,
		title: 'TypeScript',
		description:
			'A free and open-source front-end JavaScript library for building user interfaces based on components.',
	},
];

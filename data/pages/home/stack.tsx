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
			'A free and open-source front-end JavaScript library for building user interfaces based on components. ',
	},
	{
		href: 'https://nextjs.org/',
		imageSrc: '/icons/stack/next-js.svg',
		imageWidth: 90,
		imageHeight: 50,
		title: 'Next.js',
		description:
			'Next.js is an open-source web development framework providing React-based web applications with server-side rendering and static website generation.',
	},
	{
		href: 'https://vercel.com/',
		imageSrc: '/icons/stack/vercel.svg',
		imageWidth: 115,
		imageHeight: 50,
		title: 'Vercel',
		description:
			'Vercel is an American cloud platform as a service company. The company maintains the Next.js web development environment. Vercel is deployed through Git repositories.',
	},
	{
		href: 'https://www.framer.com/',
		imageSrc: '/icons/stack/framer.svg',
		imageWidth: 50,
		imageHeight: 50,
		title: 'Framer',
		description:
			'Framer Motion is a simple yet powerful motion library for React. It powers the amazing animations and interactions in Framer, the web builder for creative pros. Zero code, maximum speed.',
	},
	{
		href: 'https://www.typescriptlang.org/',
		imageSrc: '/icons/stack/type_script.svg',
		imageWidth: 50,
		imageHeight: 50,
		title: 'TypeScript',
		description:
			'TypeScript is a free and open-source high-level programming language developed by Microsoft that adds static typing with optional type annotations to JavaScript.',
	},
];

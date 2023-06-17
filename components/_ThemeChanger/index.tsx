import React, { useState, useEffect } from 'react';
import {
	SunIcon,
	MoonIcon,
	ComputerDesktopIcon,
} from '@heroicons/react/24/solid';

import { useTheme } from 'next-themes';

const ThemeChanger = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const themeOptions = [
		{
			theme: 'light',
			icon: <SunIcon className="w-5 h-5 flex-1" />,
			title: 'Light Theme',
		},
		{
			theme: 'dark',
			icon: <MoonIcon className="w-5 h-5 flex-1" />,
			title: 'Dark Theme',
		},
		{
			theme: 'system',
			icon: <ComputerDesktopIcon className="w-5 h-5 flex-1" />,
			title: 'System Theme',
		},
	];

	return (
		<React.Fragment>
			{mounted && (
				<div className="ml-auto flex w-fit space-x-2 border border-border dark:border-borderDark  p-1 rounded-3xl">
					{themeOptions.map((option) => (
						<button
							key={option.theme}
							className={`${
								theme === option.theme && 'bg-accent text-colorPrimaryDark'
							} p-1 rounded-[50%] border-2 border-transparent transition-all hover:border-accent`}
							onClick={() => setTheme(option.theme)}
							title={option.title}
						>
							{option.icon}
						</button>
					))}
				</div>
			)}
		</React.Fragment>
	);
};

export default ThemeChanger;

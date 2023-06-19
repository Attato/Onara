import React from 'react';
import Link from 'next/link';
import ThemeChanger from '@/components/_ThemeChanger';
import LanguageChanger from '@/components/_LanguageChanger';

const Footer = () => {
	return (
		<footer className="p-6 bg-background dark:bg-backgroundDark border-t border-border dark:border-borderDark select-none">
			<div className="flex flex-col gap-4 max-w-5xl m-auto text-colorPrimary dark:text-colorPrimaryDark">
				<div className="flex justify-between">
					<LanguageChanger />

					<div className="max-w-[220px] w-full flex flex-col mx-4">
						<h3 className="font-medium mb-4">Product</h3>
						<Link
							href="/changelog"
							className="mb-3 last:mb-0 text-sm text-colorSecondary hover:opacity-90 dark:text-colorSecondaryDark font-medium w-fit"
						>
							Changelog
						</Link>
						<Link
							href="https://opencollective.com/onara"
							target="_blank"
							className="mb-3 last:mb-0 text-sm text-colorSecondary hover:opacity-90 dark:text-colorSecondaryDark font-medium w-fit"
						>
							Support
						</Link>
						<Link
							href="https://github.com/Attato/Onara/discussions/categories/feedback"
							target="_blank"
							className="mb-3 last:mb-0 text-sm text-colorSecondary hover:opacity-90 dark:text-colorSecondaryDark font-medium w-fit"
						>
							Feedback
						</Link>
					</div>

					<div className="max-w-[220px] w-full flex flex-col mx-4">
						<h3 className="font-medium mb-4">Company</h3>
						<Link
							href="https://github.com/Attato/Onara"
							target="_blank"
							className="mb-3 last:mb-0 text-sm text-colorSecondary hover:opacity-90 dark:text-colorSecondaryDark font-medium w-fit"
						>
							Open source
						</Link>
						<Link
							href="/"
							className="mb-3 last:mb-0 text-sm text-colorSecondary hover:opacity-90 dark:text-colorSecondaryDark font-medium w-fit"
						>
							Privacy Policy
						</Link>
					</div>
				</div>

				<div className="flex items-center border-t border-border dark:border-borderDark pt-6 mt-6">
					<div className="flex flex-1 w-full h-max">
						<Link href="/" className="text-3xl font-black">
							ONARA
						</Link>
					</div>
					<ThemeChanger />
				</div>
			</div>
		</footer>
	);
};

export default Footer;

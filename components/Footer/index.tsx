import React, { useState, useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import {
	SunIcon,
	MoonIcon,
	ComputerDesktopIcon,
} from '@heroicons/react/24/solid';

const Footer: FC = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const renderThemeChanger = () => {
		if (!mounted) return null;

		return (
			<div className="flex-1">
				<div className="ml-auto flex w-fit space-x-2 border border-borderColor dark:border-borderColorDark p-1 rounded-3xl">
					<button
						className={`${
							theme === 'light' &&
							'bg-backgroundSecondary dark:bg-backgroundSecondaryDark'
						} p-1 rounded-[50%]`}
						onClick={() => setTheme('light')}
						title="Light Theme"
					>
						<SunIcon className="w-5 h-5 flex-1" />
					</button>
					<button
						className={`${
							theme === 'dark' &&
							'bg-backgroundSecondary dark:bg-backgroundSecondaryDark'
						} p-1 rounded-[50%]`}
						onClick={() => setTheme('dark')}
						title="Dark Theme"
					>
						<MoonIcon className="w-5 h-5 flex-1" />
					</button>
					<button
						className={`${
							theme === 'system' &&
							'bg-backgroundSecondary dark:bg-backgroundSecondaryDark'
						} p-1 rounded-[50%]`}
						onClick={() => setTheme('system')}
						title="System Theme"
					>
						<ComputerDesktopIcon className="w-5 h-5 flex-1" />
					</button>
				</div>
			</div>
		);
	};

	const changeLocale = (locale: string) => {
		document.cookie = `NEXT_LOCALE=${locale}`;
	};

	const { t } = useTranslation();

	const router = useRouter();

	const { locales, locale, query, pathname } = router;

	return (
		<footer className="p-6 bg-backgroundPrimary dark:bg-backgroundPrimaryDark border-t border-borderColor dark:border-borderColorDark select-none">
			<div className="flex flex-col gap-4 max-w-5xl m-auto text-colorPrimary dark:text-colorPrimaryDark">
				<div className="flex justify-between">
					<Listbox value={locales}>
						{({ open }) => (
							<div className="relative h-fit w-full max-w-[220px] mr-4">
								<Listbox.Button className="rounded-[10px] w-full h-10 font-medium flex items-center justify-between border border-borderColor dark:border-borderColorDark px-3">
									<span className="flex items-center">
										{locale === 'en' && <>{t('common:languages.english')}</>}
										{locale === 'ru' && <>{t('common:languages.russian')}</>}
									</span>
									<ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
								</Listbox.Button>

								{open && (
									<Listbox.Options className="absolute left-0 rounded-md mt-1 w-full py-1 border bg-backgroundPrimary dark:bg-backgroundPrimaryDark border-borderColor dark:border-borderColorDark">
										{locales?.map((currentLocale) => {
											return (
												<Link
													key={currentLocale}
													href={{ pathname, query }}
													locale={currentLocale}
													onClick={() => changeLocale(currentLocale)}
												>
													<Listbox.Option
														value={currentLocale}
														className={`${
															currentLocale === locale && 'font-medium'
														} flex text-sm items-center justify-between px-4 py-2 cursor-pointer`}
													>
														{currentLocale === 'en' && (
															<>{t('common:languages.english')}</>
														)}
														{currentLocale === 'ru' && (
															<>{t('common:languages.russian')}</>
														)}

														{currentLocale === locale && (
															<CheckIcon
																width={16}
																height={16}
																strokeWidth={2}
															/>
														)}
													</Listbox.Option>
												</Link>
											);
										})}
									</Listbox.Options>
								)}
							</div>
						)}
					</Listbox>

					<div className="max-w-[220px] w-full flex flex-col mx-4">
						<h3 className="font-medium mb-4">Product</h3>
						<Link
							href="/"
							className="mb-2 last:mb-0 text-sm text-colorSecondary hover:opacity-90 dark:text-colorSecondaryDark font-medium w-fit"
						>
							Changelog
						</Link>
						<Link
							href="/"
							className="mb-2 last:mb-0 text-sm text-colorSecondary hover:opacity-90 dark:text-colorSecondaryDark font-medium w-fit"
						>
							Support
						</Link>
						<Link
							href="/"
							className="mb-2 last:mb-0 text-sm text-colorSecondary hover:opacity-90 dark:text-colorSecondaryDark font-medium w-fit"
						>
							Feedback
						</Link>
					</div>

					<div className="max-w-[220px] w-full flex flex-col mx-4">
						<h3 className="font-medium mb-4">Company</h3>
						<Link
							href="/"
							className="mb-2 last:mb-0 text-sm text-colorSecondary hover:opacity-90 dark:text-colorSecondaryDark font-medium w-fit"
						>
							Open source
						</Link>
						<Link
							href="/"
							className="mb-2 last:mb-0 text-sm text-colorSecondary hover:opacity-90 dark:text-colorSecondaryDark font-medium w-fit"
						>
							Privacy Policy
						</Link>
					</div>
				</div>

				<div className="flex items-center border-t border-borderColor dark:border-borderColorDark pt-6 mt-6">
					<div className="flex flex-1 w-full h-max">
						<Link href="/" className="text-3xl font-black">
							ONARA
						</Link>
					</div>
					{renderThemeChanger()}
				</div>
			</div>
		</footer>
	);
};

export default Footer;

import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';

const LanguageChanger = () => {
	const changeLocale = (locale: string) => {
		document.cookie = `NEXT_LOCALE=${locale}`;
	};

	const { t } = useTranslation();

	const router = useRouter();

	const { locales, locale, query, pathname } = router;

	const languageOptions = [
		{
			locale: 'en',
			label: t('common:languages.english'),
		},
		{
			locale: 'ru',
			label: t('common:languages.russian'),
		},
	];

	return (
		<Listbox value={locales}>
			{({ open }) => (
				<div className="relative h-fit w-full max-w-[220px] mr-4">
					<Listbox.Button
						className={`${
							open && 'ring-2 ring-accent dark:ring-accent'
						} flex items-center justify-between w-full rounded-md  py-1.5 px-3 bg-surface100 dark:bg-surface100Dark text-colorPrimary dark:text-colorPrimaryDark shadow-sm ring-1 ring-inset ring-border dark:ring-borderDark sm:text-sm sm:leading-6`}
					>
						<span className="flex items-center">
							{locale === 'en' && <>{t('common:languages.english')}</>}
							{locale === 'ru' && <>{t('common:languages.russian')}</>}
						</span>
						<ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
					</Listbox.Button>

					{open && (
						<Listbox.Options className="absolute left-0 rounded-md mt-1 w-full py-1 border border-border dark:border-borderDark bg-surface100 dark:bg-surface100Dark">
							{languageOptions.map((option) => (
								<Link
									key={option.locale}
									href={{ pathname, query }}
									locale={option.locale}
									onClick={() => changeLocale(option.locale)}
								>
									<Listbox.Option
										value={option.locale}
										className={`${
											option.locale === locale && 'font-medium'
										} flex text-sm items-center justify-between px-4 py-2 cursor-pointer hover:bg-accent hover:text-slate-100 transition-all`}
									>
										{option.label}
										{option.locale === locale && (
											<CheckIcon width={16} height={16} strokeWidth={2} />
										)}
									</Listbox.Option>
								</Link>
							))}
						</Listbox.Options>
					)}
				</div>
			)}
		</Listbox>
	);
};

export default LanguageChanger;

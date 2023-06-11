import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import {
	ArrowTopRightOnSquareIcon,
	ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/solid';

import { options } from '@/data/components/header/options';
import BurgerMenu from '@/components/BurgerMenu';
import Dropdown from '@/components/Dropdown';

const Header: React.FC = () => {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);

	const closeBurgerMenu = () => {
		setTimeout(() => {
			setIsBurgerMenuOpen(!isBurgerMenuOpen);
		}, 100);
	};

	const { data, status } = useSession();

	const links = [
		{ href: '/changelog', label: 'Changelog', target: '_self' },
		{
			href: 'https://opencollective.com/onara',
			label: 'Support',
			target: '_blank',
		},
		{
			href: 'https://github.com/Attato/Onara/discussions/categories/feedback',
			label: 'Feedback',
			target: '_blank',
		},
	];

	return (
		<header className="absolute z-10 w-full min-h-[64px] flex text-slate-100 select-none">
			<div className="flex max-w-5xl w-full m-auto px-6">
				<Link href="/" className="flex items-center justify-center">
					<Image
						src="/icon.svg"
						width={40}
						height={40}
						alt="img"
						draggable={false}
					/>
				</Link>

				<div className="flex-1 flex justify-center items-center">
					<div className="flex gap-3">
						{links.map((link) => {
							return (
								<Link
									href={link.href}
									key={link.href}
									target={link.target}
									className="flex gap-1 text-sm px-2 mt-3 font-medium max-md:hidden"
								>
									{link.label}
									{link.target === '_blank' && (
										<ArrowTopRightOnSquareIcon width={14} height={14} />
									)}
								</Link>
							);
						})}
					</div>
				</div>

				{status === 'authenticated' && (
					<div className="">
						<div className="">
							<Dropdown
								buttonContent={
									<React.Fragment>
										<Image
											src={`${data.user?.image}`}
											width={32}
											height={32}
											alt={data.user?.name + ' logo'}
										/>
									</React.Fragment>
								}
							>
								{options.map((option) => (
									<Link
										href={option.href}
										role="menuitem"
										// className="" ={
										// 	option.label === 'Sign out'
										// 		? styles.signout
										// 		: styles.option
										// }
										key={option.label}
										onClick={() => option.label === 'Sign out' && signOut()}
									>
										<span>{option.label}</span>
										{option.image}
									</Link>
								))}
							</Dropdown>
						</div>

						<BurgerMenu
							isBurgerMenuOpen={isBurgerMenuOpen}
							closeBurgerMenu={closeBurgerMenu}
						>
							{options.map(
								(option) =>
									option.label !== 'Sign out' && (
										<Link href={option.href} role="menuitem" key={option.label}>
											<span>{option.label}</span>
											{option.image}
										</Link>
									)
							)}

							<button onClick={() => signOut()} className="">
								Sign out <ArrowRightOnRectangleIcon width={16} height={16} />
							</button>

							<h4 className="">Pages</h4>
							{links.map((menuItem) => (
								<Link
									href={menuItem.href}
									key={menuItem.label}
									className=""
									target={menuItem.target}
								>
									{menuItem.label}
									{menuItem.target === '_blank' && (
										<ArrowTopRightOnSquareIcon width={14} height={14} />
									)}
								</Link>
							))}
						</BurgerMenu>
					</div>
				)}

				{status === 'unauthenticated' && (
					<div className="flex-1 flex justify-end items-center">
						<Link
							href="/auth/signin"
							className="flex items-center gap-1 font-medium text-sm pl-2 mt-3 max-md:hidden"
						>
							Sign in
							<ArrowRightOnRectangleIcon width={16} height={16} />
						</Link>

						<BurgerMenu
							isBurgerMenuOpen={isBurgerMenuOpen}
							closeBurgerMenu={closeBurgerMenu}
						>
							{links.map((link) => (
								<Link
									href={link.href}
									key={link.label}
									className=""
									target={link.target}
								>
									{link.label}
									{link.target === '_blank' && (
										<ArrowTopRightOnSquareIcon width={14} height={14} />
									)}
								</Link>
							))}
						</BurgerMenu>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;

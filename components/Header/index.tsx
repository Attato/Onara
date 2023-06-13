import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import {
	ArrowTopRightOnSquareIcon,
	ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/solid';

import BurgerMenu from '@/components/BurgerMenu';

const Header: React.FC = () => {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);

	const closeBurgerMenu = () => {
		setTimeout(() => {
			setIsBurgerMenuOpen(!isBurgerMenuOpen);
		}, 100);
	};

	const { status } = useSession();

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
		<>
			{status === 'unauthenticated' && (
				<header className="absolute z-10 w-full min-h-[64px] flex text-slate-100 select-none">
					<div className=" flex w-full max-w-5xl m-auto px-6">
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

						<div className="flex-1 flex justify-end items-center">
							{status === 'unauthenticated' && (
								<Link
									href="/auth/signin"
									className="flex items-center gap-1 font-medium text-sm pl-2 mt-3 max-md:hidden"
								>
									Sign in
									<ArrowRightOnRectangleIcon width={16} height={16} />
								</Link>
							)}

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
					</div>
				</header>
			)}
		</>
	);
};

export default Header;

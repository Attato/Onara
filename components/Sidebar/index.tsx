import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
	ChevronRightIcon,
	ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import {
	MoonIcon,
	MinusCircleIcon,
	PlusIcon,
	UserGroupIcon,
} from '@heroicons/react/24/solid';
import { Popover, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import { ProfileProps } from '@/pages/[username]';
import { useFormatDate } from '@/hooks/useFormatDate';
import ModalPage from '@/components/ModalPage';

const Sidebar: React.FC<ProfileProps> = ({ profileData }) => {
	const [selectedStatus, setSelectedStatus] = useState('Online');

	let statusIcon;

	if (selectedStatus === 'Online') {
		statusIcon = (
			<div className="w-3 h-3 rounded-[50%] bg-accent group-hover:bg-colorPrimaryDark" />
		);
	} else if (selectedStatus === 'Idle') {
		statusIcon = (
			<MoonIcon
				width={14}
				height={14}
				className="text-attention group-hover:text-colorPrimaryDark"
			/>
		);
	} else if (selectedStatus === 'Do Not Disturb') {
		statusIcon = (
			<MinusCircleIcon
				width={14}
				height={14}
				className="text-warning group-hover:text-colorPrimaryDark"
			/>
		);
	} else if (selectedStatus === 'Invisible') {
		statusIcon = (
			<div className="w-3 h-3 rounded-[50%] border-[3px] border-colorSecondary dark:border-colorSecondaryDark group-hover:border-colorPrimaryDark" />
		);
	}

	let statusIconSmall;

	if (selectedStatus === 'Online') {
		statusIconSmall = (
			<div className="w-2 h-2 rounded-[50%] bg-accent group-hover:bg-colorPrimaryDark" />
		);
	} else if (selectedStatus === 'Idle') {
		statusIconSmall = (
			<MoonIcon
				width={8}
				height={8}
				className="text-attention group-hover:text-colorPrimaryDark"
			/>
		);
	} else if (selectedStatus === 'Do Not Disturb') {
		statusIconSmall = (
			<MinusCircleIcon
				width={8}
				height={8}
				className="text-warning group-hover:text-colorPrimaryDark"
			/>
		);
	} else if (selectedStatus === 'Invisible') {
		statusIconSmall = (
			<div className="w-2 h-2 rounded-[50%]  bg-colorSecondary dark:bg-colorSecondaryDark group-hover:bg-colorPrimaryDark" />
		);
	}

	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		const storedGroups = localStorage.getItem('groups');
		if (storedGroups) {
			setGroups(JSON.parse(storedGroups));
		}
	}, []);

	return (
		<div className="flex">
			<div className="flex flex-col items-center gap-2 bg-surface300 dark:bg-surface300Dark min-w-[72px] p-3">
				<Link
					href="/"
					className="w-12 h-12 bg-black rounded-2xl hover:rounded-[50%] transition-all flex items-center justify-center"
				>
					<Image
						src="/icons/icon-512_transparent.png"
						width={42}
						height={42}
						alt="logo"
					/>
				</Link>

				<hr className="border-b-2 border-[#ccced3] border-t-0 w-8 dark:border-surface75Dark" />

				{groups.length !== 0 &&
					groups
						?.slice()
						.reverse()
						.map((group: any) => {
							return (
								<React.Fragment key={group.id}>
									<Link
										href={`/${profileData?.name}/groups/${group.id}`}
										className="w-12 h-12 bg-accent rounded-[50%] hover:rounded-2xl transition-all flex items-center justify-center text-accent"
									>
										<UserGroupIcon
											width={40}
											height={40}
											className="bg-accent p-2 rounded-full text-colorPrimaryDark"
										/>
									</Link>
								</React.Fragment>
							);
						})}

				<Link
					href={`/${profileData?.name}/groups`}
					className="w-12 h-12 bg-background dark:bg-backgroundDark rounded-[50%] hover:rounded-2xl transition-all flex items-center justify-center text-accent"
				>
					<PlusIcon width={24} height={24} />
				</Link>
			</div>
			<div className="flex flex-col min-w-[240px] w-full h-screen pt-3 bg-surface100 dark:bg-surface100Dark">
				<div className="flex flex-col  px-3 h-[calc(100vh-52px)] overflow-auto">
					<div className="flex items-center justify-between">
						<h2 className="px-3 text-xs font-semibold text-colorSecondary dark:text-colorSecondaryDark uppercase py-2">
							Friends:
						</h2>
						<Link
							href={`${profileData?.name}` + '/friends'}
							className="text-colorSecondary dark:text-colorSecondaryDark hover:text-colorPrimary hover:dark:text-colorPrimaryDark p-1 hover:bg-surface300 hover:dark:bg-surface300Dark rounded-md transition-all"
						>
							<PlusIcon width={16} height={16} />
						</Link>
					</div>
					{profileData.friends.map((friend: any) => {
						return (
							<Link
								href={`/${profileData?.name}/messages/${friend.id}`}
								key={friend.id}
								className="flex items-center gap-3 hover:bg-surface300 hover:dark:bg-surface300Dark text-colorSecondary dark:text-colorSecondaryDark hover:text-colorPrimary hover:dark:text-colorPrimaryDark rounded-md px-3 py-2 transition-all"
							>
								<div className="relative">
									<Image
										src={friend.image}
										width={32}
										height={32}
										alt={friend.name + 'avatar'}
										className="rounded-[50%]"
									/>
									<div className="bg-surface100 dark:bg-surface100Dark w-[14px] h-[14px] absolute right-[-2px] bottom-[-2px] rounded-[50%] flex items-center justify-center">
										<div className="w-[10px] h-[10px] rounded-[50%] border-[2px] border-colorSecondary dark:border-colorSecondaryDark group-hover:border-colorPrimaryDark" />
									</div>
								</div>

								<div className="flex flex-col items-start">
									<h3 className="text-sm text-colorPrimary dark:text-colorPrimaryDark font-medium">
										{friend.name}
									</h3>
									<span className="text-xs font-medium">@{friend.id}</span>
								</div>
							</Link>
						);
					})}
				</div>
				<div className="flex items-center justify-between h-[52px] bg-surface200 dark:bg-surface200Dark px-3">
					<Popover className="relative">
						<Popover.Button className="flex items-center hover:bg-surface100 hover:dark:bg-surface100Dark transition-all pl-2 pr-4 py-1 rounded-md outline-none">
							<div className="relative flex">
								<Image
									src={`${profileData?.image}`}
									width={32}
									height={32}
									alt="profile image"
									priority={true}
									className="rounded-[20px] select-none h-fit"
								/>
								<div className="absolute bottom-0 right-0">
									{statusIconSmall}
								</div>
							</div>

							<div className="flex flex-col font-medium ml-2 text-left">
								<h6 className="text-sm">{profileData?.name}</h6>
								<span className="text-xs text-colorSecondary dark:text-colorSecondaryDark ">
									{selectedStatus}
								</span>
							</div>
						</Popover.Button>

						<Transition
							enter="transition duration-100 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-100"
							leave="transition duration-75 ease-out"
							leaveFrom="transform scale-100 opacity-100"
							leaveTo="transform scale-95 opacity-0"
						>
							<Popover.Panel className="absolute z-10 bottom-16 bg-surface200 dark:bg-surface200Dark rounded-lg w-80 text-sm font-medium shadow-md">
								<div className="absolute bg-accent w-full h-[60px] rounded-t-md"></div>
								<div className="m-4 mb-0">
									<div className="relative w-fit">
										<Image
											src={`${profileData?.image}`}
											width={96}
											height={96}
											alt="profile image"
											priority={true}
											className="rounded-[50%] select-none h-fit border-4 border-surface200 dark:border-surface200Dark"
										/>
									</div>
								</div>
								<div className="m-4 bg-surface400 dark:bg-surface400Dark rounded-md">
									<div className="py-4 px-3">
										<div className="border-b border-border dark:border-borderDark pb-3 mb-3">
											<h2 className="text-xl font-semibold">
												{profileData?.name}
											</h2>

											<p className="text-sm text-colorSecondary dark:text-colorSecondaryDark overflow-hidden max-h-5 line-clamp-1">
												{profileData?.bio}
											</p>
										</div>
										<div className="flex flex-col gap-1 border-b border-border dark:border-borderDark pb-3 mb-3">
											<h3 className="font-semibold uppercase text-xs">
												GitHub member since
											</h3>
											<span className="text-xs text-colorSecondary dark:text-colorSecondaryDark">
												{useFormatDate(profileData?.createdAt)}
											</span>
										</div>
										<div className="flex flex-col gap-1 border-b border-border dark:border-borderDark pb-3 mb-3">
											<h3 className="font-semibold uppercase text-xs">
												Status
											</h3>
											<div
												onMouseEnter={() => setIsPanelOpen(true)}
												onMouseLeave={() => setIsPanelOpen(false)}
												className={`${
													isPanelOpen
														? 'text-colorPrimary dark:text-colorPrimaryDark bg-surface200 dark:bg-surface200Dark'
														: 'text-colorSecondary dark:text-colorSecondaryDark'
												} flex items-center justify-between w-full text-left px-2 pr-4 py-2 hover:text-colorPrimary hover:dark:text-colorPrimaryDark hover:bg-surface200 hover:dark:bg-surface200Dark rounded-md transition-all relative`}
											>
												<div className="flex items-center gap-2">
													{statusIcon}
													<span className="text-sm ">{selectedStatus}</span>
												</div>

												<ChevronRightIcon
													width={14}
													height={14}
													strokeWidth={2}
												/>

												{isPanelOpen && (
													<div className="flex items-start w-72 text-left absolute left-[264px] top-[-46px] cursor-default">
														<div className="w-4 h-[112px] flex " />
														<div className="rounded-md px-3 py-4 bg-surface400 dark:bg-surface400Dark w-full text-sm shadow-md">
															<div className="border-b border-b-border dark:border-b-borderDark pb-3 mb-3">
																<button
																	onClick={() => setSelectedStatus('Online')}
																	className="flex items-center gap-2 p-2 w-full text-left hover:bg-accent text-colorSecondary dark:text-colorSecondaryDark hover:text-colorPrimaryDark hover:dark:text-colorPrimaryDark  transition-all rounded-md group"
																>
																	<div className="w-3 h-3 rounded-[50%] bg-accent group-hover:bg-colorPrimaryDark" />
																	Online
																</button>
															</div>
															<button
																onClick={() => setSelectedStatus('Idle')}
																className="flex items-center gap-2 p-2 w-full text-left hover:bg-accent text-colorSecondary dark:text-colorSecondaryDark hover:text-colorPrimaryDark hover:dark:text-colorPrimaryDark  transition-all rounded-md group"
															>
																<MoonIcon
																	width={14}
																	height={14}
																	className="text-attention group-hover:text-colorPrimaryDark"
																/>
																Idle
															</button>
															<button
																onClick={() =>
																	setSelectedStatus('Do Not Disturb')
																}
																className="flex items-center gap-2 p-2 w-full text-left hover:bg-accent text-colorSecondary dark:text-colorSecondaryDark hover:text-colorPrimaryDark hover:dark:text-colorPrimaryDark  transition-all rounded-md group"
															>
																<MinusCircleIcon
																	width={14}
																	height={14}
																	className="text-warning group-hover:text-colorPrimaryDark"
																/>
																Do Not Disturb
															</button>
															<button
																onClick={() => setSelectedStatus('Invisible')}
																className="flex items-center gap-2 p-2 w-full text-left hover:bg-accent text-colorSecondary dark:text-colorSecondaryDark hover:text-colorPrimaryDark hover:dark:text-colorPrimaryDark transition-all rounded-md group"
															>
																<div className="w-3 h-3 rounded-[50%] border-[3px] border-colorSecondary dark:border-colorSecondaryDark group-hover:border-colorPrimaryDark" />
																Invisible
															</button>
														</div>
													</div>
												)}
											</div>
										</div>
										<button
											className="flex items-center justify-between text-warning w-full text-left px-2 pr-4 py-2 h-9 hover:bg-surface200 hover:dark:bg-surface200Dark rounded-md transition-all uppercase text-xs font-semibold"
											onClick={() => signOut()}
										>
											Sign out
											<ArrowRightOnRectangleIcon
												width={14}
												height={14}
												strokeWidth={2}
											/>
										</button>
									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</Popover>

					<ModalPage profileData={profileData} />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
	ChevronRightIcon,
	ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { MoonIcon, MinusCircleIcon } from '@heroicons/react/24/solid';
import { Popover, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import { ProfileProps } from '@/pages/[username]';
import { useFormatDate } from '@/hooks/useFormatDate';
import ModalPage from '@/components/ModalPage';

const Sidebar: React.FC<ProfileProps> = ({ profileData }) => {
	const [isOnline, setIsOnline] = useState(false);

	useEffect(() => {
		const handleStatusChange = () => {
			setIsOnline(navigator.onLine);
		};

		if (typeof window !== 'undefined') {
			setIsOnline(navigator.onLine);
			window.addEventListener('online', handleStatusChange);
			window.addEventListener('offline', handleStatusChange);
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('online', handleStatusChange);
				window.removeEventListener('offline', handleStatusChange);
			}
		};
	}, []);

	const [isPanelOpen, setIsPanelOpen] = useState(false);

	return (
		<div className="flex">
			<div className="bg-surface300 dark:bg-surface300Dark min-w-[72px] p-3">
				<div className="flex items-center justify-center border-2 border-dashed px-1 h-12 py-1 text-[8px] font-medium rounded-xl hover:rounded-[50%] transition-all cursor-pointer border-border dark:border-borderDark">
					Group
				</div>
			</div>
			<div className="flex flex-col min-w-[240px] w-full h-screen pt-3 bg-surface100 dark:bg-surface100Dark">
				<div className="flex flex-col gap-3 h-full px-3">
					<div className="border-dashed border-2 px-3 py-2 text-sm font-medium rounded-md border-border dark:border-borderDark cursor-pointer">
						Friend
					</div>
					<div className="border-dashed border-2 px-3 py-2 text-sm font-medium rounded-md border-border dark:border-borderDark cursor-pointer">
						Friend
					</div>
					<div className="border-dashed border-2 px-3 py-2 text-sm font-medium rounded-md border-border dark:border-borderDark cursor-pointer">
						Friend
					</div>
				</div>
				<div className="flex items-center justify-between h-14 bg-surface200 dark:bg-surface200Dark px-3">
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
								<div className="w-3 h-3 rounded-[50%] border-2 border-surface200 dark:border-surface200Dark absolute bottom-0 right-0 bg-accent" />
							</div>

							<div className="flex flex-col font-medium ml-2 text-left">
								<h6 className="text-sm">{profileData?.name}</h6>
								<span className="text-xs text-colorSecondary dark:text-colorSecondaryDark ">
									{isOnline ? 'Online' : 'Offline'}
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
								<div className="m-4">
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
								<div className="mx-4 mb-4 mt-7 bg-surface400 dark:bg-surface400Dark rounded-md">
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
													<div className="w-3 h-3 rounded-[50%] bg-accent" />
													<span className="text-sm ">
														{isOnline ? 'Online' : 'Offline'}
													</span>
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
																<button className="flex items-center gap-2 p-2 w-full text-left hover:bg-accent text-colorSecondary dark:text-colorSecondaryDark hover:text-colorPrimaryDark transition-all rounded-md group">
																	<div className="w-3 h-3 rounded-[50%] bg-accent group-hover:bg-colorPrimaryDark" />
																	Online
																</button>
															</div>
															<button className="flex items-center gap-2 p-2 w-full text-left hover:bg-accent text-colorSecondary dark:text-colorSecondaryDark hover:text-colorPrimaryDark  transition-all rounded-md group">
																<MoonIcon
																	width={14}
																	height={14}
																	className="text-attention group-hover:text-colorPrimaryDark"
																/>
																Idle
															</button>
															<button className="flex items-center gap-2 p-2 w-full text-left hover:bg-accent text-colorSecondary dark:text-colorSecondaryDark hover:text-colorPrimaryDark  transition-all rounded-md group">
																<MinusCircleIcon
																	width={14}
																	height={14}
																	className="text-warning group-hover:text-colorPrimaryDark"
																/>
																Do Not Disturb
															</button>
															<button className="flex items-center gap-2 p-2 w-full text-left hover:bg-accent text-colorSecondary dark:text-colorSecondaryDark hover:text-colorPrimaryDark  transition-all rounded-md group">
																<div className="w-3 h-3  rounded-[50%] border-[3px] border-colorSecondary dark:border-colorSecondaryDark group-hover:border-colorPrimaryDark" />
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

					<ModalPage />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;

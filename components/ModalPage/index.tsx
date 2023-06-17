import React, { useState, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Transition, Dialog } from '@headlessui/react';
import { Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import ThemeChanger from '@/components/_ThemeChanger';
import LanguageChanger from '@/components/_LanguageChanger';
import { ProfileProps } from '@/pages/[username]';

const ModalPage: FC<ProfileProps> = ({ profileData }) => {
	let [isModalOpen, setIsModalOpen] = useState(false);
	let [activeTab, setActiveTab] = useState('my-account');

	function closeModal() {
		setIsModalOpen(false);
	}

	function openModal() {
		setIsModalOpen(true);
	}

	return (
		<React.Fragment>
			<div className="w-fit max-w-[125px] flex items-center justify-center">
				<button
					onClick={openModal}
					className="text-colorSecondary dark:text-colorSecondaryDark hover:text-colorPrimary hover:dark:text-colorPrimaryDark p-1 hover:bg-surface100 hover:dark:bg-surface100Dark rounded-md transition-all"
				>
					<Cog6ToothIcon width={20} height={20} />
				</button>
			</div>

			<Transition appear show={isModalOpen} as={React.Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={React.Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center text-center">
							<Transition.Child
								as={React.Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="flex w-full h-screen bg-background dark:bg-backgroundDark">
									<div className="min-w-[440px] bg-surface100 dark:bg-surface100Dark">
										<div className="flex flex-col items-start py-16 px-3 max-w-[218px] ml-auto text-colorSecondary dark:text-colorSecondaryDark text-sm font-medium text-left">
											<h3 className="uppercase text-xs font-bold px-3 pb-[6px]">
												# User settings
											</h3>
											<div className="flex flex-col w-full">
												<button
													className={`${
														activeTab === 'my-account'
															? 'bg-surface50 dark:bg-surface50Dark hover:bg-surface-75 hover:dark:bg-surface75Dark text-colorPrimary dark:text-colorPrimaryDark'
															: 'hover:bg-surface75 hover:dark:bg-surface75Dark'
													} w-full text-left mb-[2px] outline-none focus-visible:ring-1 ring-border dark:ring-borderDark rounded-md px-3 py-2 hover:text-colorPrimary hover:dark:text-colorPrimaryDark transition-all`}
													onClick={() => setActiveTab('my-account')}
												>
													My Account
												</button>
												<button
													className={`${
														activeTab === 'profiles'
															? 'bg-surface50 dark:bg-surface50Dark hover:bg-surface-75 hover:dark:bg-surface75Dark text-colorPrimary dark:text-colorPrimaryDark'
															: 'hover:bg-surface75 hover:dark:bg-surface75Dark'
													} w-full text-left mb-[2px] outline-none focus-visible:ring-1 ring-border dark:ring-borderDark rounded-md px-3 py-2 hover:text-colorPrimary hover:dark:text-colorPrimaryDark transition-all`}
													onClick={() => setActiveTab('profiles')}
												>
													Profiles
												</button>

												<hr className="mb-3 pb-3 mx-3 max-w-[170px] border-t-0 border-b border-b-border dark:border-b-borderDark" />
											</div>
											<h3 className="uppercase text-xs font-bold px-3 py-[6px]">
												# App settings
											</h3>
											<div className="flex flex-col w-full">
												<button
													className={`${
														activeTab === 'appearance'
															? 'bg-surface50 dark:bg-surface50Dark hover:bg-surface-75 hover:dark:bg-surface75Dark text-colorPrimary dark:text-colorPrimaryDark'
															: 'hover:bg-surface75 hover:dark:bg-surface75Dark'
													} w-full text-left mb-[2px] outline-none focus-visible:ring-1 ring-border dark:ring-borderDark rounded-md px-3 py-2 hover:text-colorPrimary hover:dark:text-colorPrimaryDark transition-all`}
													onClick={() => setActiveTab('appearance')}
												>
													Appearance
												</button>
												<button
													className={`${
														activeTab === 'language'
															? 'bg-surface50 dark:bg-surface50Dark hover:bg-surface-75 hover:dark:bg-surface75Dark text-colorPrimary dark:text-colorPrimaryDark'
															: 'hover:bg-surface75 hover:dark:bg-surface75Dark'
													} w-full text-left mb-[2px] outline-none focus-visible:ring-1 ring-border dark:ring-borderDark rounded-md px-3 py-2 hover:text-colorPrimary hover:dark:text-colorPrimaryDark transition-all`}
													onClick={() => setActiveTab('language')}
												>
													Language
												</button>
												<hr className="mb-3 pb-3 mx-3 max-w-[170px] border-t-0 border-b border-b-border dark:border-b-borderDark" />
											</div>
											<div className="flex flex-col w-full">
												<button
													className="flex items-center justify-between outline-none focus-visible:ring-1 ring-warning px-3 py-1 text-warning w-full text-left pr-4 h-9 hover:bg-surface75 hover:dark:bg-surface75Dark rounded-md transition-all uppercase text-xs font-semibold"
													onClick={() => signOut()}
												>
													Sign out
													<ArrowRightOnRectangleIcon
														width={14}
														height={14}
														strokeWidth={2}
													/>
												</button>
												<hr className="mb-3 pb-3 mx-3 max-w-[170px] border-t-0 border-b border-b-border dark:border-b-borderDark" />
											</div>

											<div className="flex flex-col text-xs px-3">
												<span>Stable 1.0.0 (01.06.2023)</span>
												<span>Windows 10 64-Bit</span>
											</div>
										</div>
									</div>
									<div className="w-full max-w-3xl relative px-10 pb-20 pt-16 text-left">
										{activeTab === 'my-account' && (
											<React.Fragment>
												<div className="flex flex-col justify-start uppercase text-colorSecondary dark:text-colorSecondaryDark font-semibold text-xs">
													<h2 className="mb-4 text-xl font-medium">
														My Account
													</h2>
													<h3>Edit profile</h3>
													<div className="bg-surface200 dark:bg-surface200Dark rounded-lg w-80 text-sm font-medium shadow-md">
														<div className="bg-accent w-full h-[60px] rounded-t-md"></div>
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
																</div>
															</div>
														</div>
													</div>

													<h3>edit username</h3>
													<h3>edit email</h3>
													<h3>edit password</h3>
													<h3>edit phone number</h3>
													<br />
													<h3>delete account?</h3>
												</div>
											</React.Fragment>
										)}

										{activeTab === 'profiles' && (
											<React.Fragment>
												<h2 className="mb-4 text-xl font-medium">Profiles</h2>
												<div className="flex flex-col justify-start uppercase text-colorSecondary dark:text-colorSecondaryDark font-semibold text-xs">
													<h3>change avatar</h3>
													<h3>remove avatar</h3>
													<br />
													<h3>change banner</h3>
													<h3>remove banner</h3>
													<br />
													<h3>change accent color</h3>
												</div>
											</React.Fragment>
										)}

										{activeTab === 'appearance' && (
											<React.Fragment>
												<h2 className="mb-4 text-xl font-medium">Appearance</h2>
												<div className="flex flex-col justify-start uppercase text-colorSecondary dark:text-colorSecondaryDark font-semibold text-xs">
													<h3>Theme</h3>
													<div className="flex justify-center w-fit my-4">
														<ThemeChanger />
													</div>
													<h3>Dark sidebar?</h3>
													<h3 className="mt-4">Chat Font Scaling</h3>
												</div>
											</React.Fragment>
										)}

										{activeTab === 'language' && (
											<React.Fragment>
												<h2 className="mb-4 text-xl font-medium">Appearance</h2>
												<div className="flex flex-col justify-start uppercase text-colorSecondary dark:text-colorSecondaryDark font-semibold text-xs">
													<h3>Select a language</h3>
													<div className="flex justify-start w-full mt-4 capitalize">
														<LanguageChanger />
													</div>
												</div>
											</React.Fragment>
										)}
									</div>
									<div className="pt-16">
										<button
											onClick={closeModal}
											className="flex flex-col items-center gap-2 text-[13px] outline-none focus-visible:text-colorPrimary focus-visible:dark:text-colorPrimaryDark text-colorSecondary dark:text-colorSecondaryDark font-semibold hover:text-colorPrimary hover:dark:text-colorPrimaryDark transition"
										>
											<XMarkIcon width={20} height={20} strokeWidth={2} />
											<p>ESC</p>
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</React.Fragment>
	);
};

export default ModalPage;

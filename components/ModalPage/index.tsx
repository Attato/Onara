import React, { useState, FC } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';

const ModalPage: FC = ({}) => {
	let [isModalOpen, setIsModalOpen] = useState(false);

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
								<Dialog.Panel className="w-full h-screen transform overflow-hidden bg-background dark:bg-backgroundDark text-left align-middle shadow-xl transition-all">
									<div className="flex flex-col"></div>
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

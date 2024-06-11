"use client";

import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
	onClose: () => void;
	children: React.ReactNode;
	isOpen?: boolean;
	className?: string;
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
	return (
		<Transition show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/90 transition-opacity" />
				</TransitionChild>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<DialogPanel
								className={clsx(
									"relative transform overflow-hidden rounded-lg bg-black border border-slate-800 text-left shadow-xl transition-all w-full sm:w-full ",
									className ? className : "sm:max-w-lg p-4 sm:my-8 sm:p-6",
								)}
							>
								<div className="absolute right-4 top-4 z-10">
									<button
										type="button"
										className="rounded-md text-slate-50 hover:text-lime-400 focus:outline-none transition duration-500"
										onClick={onClose}
									>
										<span className="sr-only">Close</span>

										<IoClose className="h-6 w-6" />
									</button>
								</div>

								{children}
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}

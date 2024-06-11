"use client";

import { Avatar, AvatarGroup } from "@components";
import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import { useActiveList, useOtherUser } from "@hooks";
import type { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";
import { ConfirmModal } from "./ConfirmModal";

type ProfileDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
	data: Conversation & {
		users: User[];
	};
};

export function ProfileDrawer({ isOpen, onClose, data }: ProfileDrawerProps) {
	const otherUser = useOtherUser(data);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const { members } = useActiveList();
	const isActive = members.indexOf(otherUser?.email!) !== -1;

	const joinedDate = useMemo(() => {
		return format(new Date(otherUser.createdAt), "PP");
	}, [otherUser.createdAt]);

	const title = useMemo(() => {
		return data.name ?? otherUser.name;
	}, [data.name, otherUser.name]);

	const statusText = useMemo(() => {
		if (data.isGroup) {
			return `${data.users.length} members`;
		}

		return isActive ? "Active" : "Offline";
	}, [data, isActive]);

	return (
		<>
			<ConfirmModal
				isOpen={confirmOpen}
				onClose={() => setConfirmOpen(false)}
			/>

			<Transition show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={onClose}>
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-40" />
					</TransitionChild>

					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
								<TransitionChild
									as={Fragment}
									enter="transform transition ease-in-out duration-500"
									enterFrom="translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-500"
									leaveTo="translate-x-full"
								>
									<DialogPanel className="pointer-events-auto w-screen max-w-md">
										<div className="flex h-full flex-col overflow-y-scroll bg-black py-6 shadow-xl">
											<button
												onClick={onClose}
												type="button"
												className="text-white flex ml-auto mr-5"
											>
												<span className="sr-only">Close panel</span>

												<IoClose size={24} />
											</button>

											<div className="relative mt-6 flex-1 px-4 sm:px-6 flex flex-col items-center">
												{data.isGroup ? (
													<AvatarGroup users={data.users} />
												) : (
													<Avatar user={otherUser} />
												)}

												<h3 className="text-md font-bold text-slate-50 truncate mt-2">
													{title}
												</h3>

												<p className="text-sm text-slate-50/50">{statusText}</p>

												<div className="flex flex-col items-center gap-2 mt-8 mb-12">
													<button
														type="button"
														className="bg-slate-50 rounded-full flex items-center justify-center p-2"
														onClick={() => setConfirmOpen(true)}
													>
														<IoTrash size={20} />
													</button>

													<button
														type="button"
														className="text-sm font-light text-slate-50 transition duration-500"
														onClick={() => setConfirmOpen(true)}
													>
														Delete
													</button>
												</div>

												<div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
													<dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
														{data.isGroup ? (
															<>
																<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
																	Emails
																</dt>

																<dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
																	{data.users
																		.map((user) => user.email)
																		.join(", ")}
																</dd>
															</>
														) : (
															<>
																<div className="flex flex-col">
																	<h3 className="text-sm font-medium text-slate-50">
																		Email
																	</h3>

																	<p className="text-sm text-slate-50/50">
																		{otherUser.email}
																	</p>
																</div>

																<hr className="my-1" />

																<div>
																	<h3 className="text-sm font-medium text-slate-50">
																		Joined
																	</h3>

																	<time
																		dateTime={joinedDate}
																		className="mt-1 text-sm text-slate-50/50"
																	>
																		{joinedDate}
																	</time>
																</div>
															</>
														)}
													</dl>
												</div>
											</div>
										</div>
									</DialogPanel>
								</TransitionChild>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

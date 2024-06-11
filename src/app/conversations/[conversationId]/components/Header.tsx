"use client";

import { Avatar, AvatarGroup } from "@components";
import { useActiveList, useOtherUser } from "@hooks";
import type { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import { ProfileDrawer } from "./ProfileDrawer";

type HeaderProps = {
	conversation: Conversation & {
		users: User[];
	};
};

export function Header({ conversation }: HeaderProps) {
	const otherUser = useOtherUser(conversation);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { members } = useActiveList();
	const isActive = members.indexOf(otherUser?.email!) !== -1;

	const statusText = useMemo(() => {
		if (conversation.isGroup) {
			return `${conversation.users.length} members`;
		}

		return isActive ? "Active" : "Offline";
	}, [conversation, isActive]);

	return (
		<>
			<ProfileDrawer
				data={conversation}
				isOpen={drawerOpen}
				onClose={() => setDrawerOpen(false)}
			/>

			<div className="bg-black w-full border-b border-slate-800 sm:px-4 py-3 px-4 lg:px-6 flex items-center gap-3 shadow-sm">
				<div className="flex flex-1 gap-3 items-center overflow-hidden">
					<Link
						href="/conversations"
						className="lg:hidden block text-white transition duration-500"
					>
						<HiChevronLeft size={32} />
					</Link>

					{conversation.isGroup ? (
						<AvatarGroup users={conversation.users} />
					) : (
						<Avatar user={otherUser} />
					)}

					<div className="flex flex-col">
						<p className="text-md font-medium text-slate-50 truncate">
							{conversation.name ?? otherUser.name}
						</p>

						<p className="text-sm font-light text-slate-50/50">{statusText}</p>
					</div>
				</div>

				<HiEllipsisHorizontal
					size={32}
					onClick={() => setDrawerOpen(true)}
					className="text-white cursor-pointer"
				/>
			</div>
		</>
	);
}

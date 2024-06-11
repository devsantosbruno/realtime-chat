"use client";

import { Avatar, AvatarGroup } from "@components";
import { useOtherUser } from "@hooks";
import type { FullConversationType } from "@types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

type ConversationBoxProps = {
	data: FullConversationType;
	selected: boolean;
};

export function ConversationBox({ data, selected }: ConversationBoxProps) {
	const otherUser = useOtherUser(data);
	const session = useSession();
	const router = useRouter();

	const handleClick = useCallback(() => {
		router.push(`/conversations/${data.id}`);
	}, [data.id, router]);

	const lastMessage = useMemo(() => {
		const messages = data.messages || [];

		return messages[messages.length - 1];
	}, [data.messages]);

	const userEmail = useMemo(() => {
		return session.data?.user?.email;
	}, [session.data?.user?.email]);

	const hasSeen = useMemo(() => {
		if (!lastMessage) {
			return false;
		}

		const seenArray = lastMessage.seen || [];

		if (!userEmail) {
			return false;
		}

		return seenArray.filter((user) => user.email === userEmail).length !== 0;
	}, [lastMessage, userEmail]);

	const lastMessageText = useMemo(() => {
		if (lastMessage?.image) {
			return "Sent an image";
		}

		if (lastMessage?.body) {
			return lastMessage.body;
		}

		return "Started a conversation";
	}, [lastMessage]);

	return (
		<div
			onClick={handleClick}
			className={clsx(
				"w-full overflow-hidden p-3 border hover:border-lime-400 hover:opacity-100 rounded-lg cursor-pointer transition duration-500",
				!selected && "border-slate-800 lg:opacity-80",
				selected && "border-lime-400 lg:opacity-100",
			)}
		>
			<div className="float-start mr-3">
				{data.isGroup ? (
					<AvatarGroup users={data.users} />
				) : (
					<Avatar user={otherUser} />
				)}
			</div>

			<div className="flex-1 focus:outline-none overflow-hidden">
				<div className="flex justify-between items-center mb-1">
					<p className="text-md font-medium text-slate-50 truncate">
						{data.name ?? otherUser.name}
					</p>

					{lastMessage?.createdAt && (
						<p className="text-xs text-gray-400 font-light">
							{format(new Date(lastMessage.createdAt), "p")}
						</p>
					)}
				</div>

				<p
					className={clsx(
						"truncate text-sm",
						hasSeen ? "text-slate-50/50" : "text-slate-100 font-medium",
					)}
				>
					{lastMessageText}
				</p>
			</div>
		</div>
	);
}

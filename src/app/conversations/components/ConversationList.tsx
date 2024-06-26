"use client";

import { useConversation } from "@hooks";
import { pusherClient } from "@libs";
import type { User } from "@prisma/client";
import type { FullConversationType } from "@types";
import clsx from "clsx";
import { find } from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { ConversationBox } from "./ConversationBox";
import { GroupChatModal } from "./GroupChatModal";

type ConversationListProps = {
	initialItems: FullConversationType[];
	users: User[];
};

export function ConversationList({
	initialItems,
	users,
}: ConversationListProps) {
	const session = useSession();
	const [items, setItems] = useState(initialItems);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const router = useRouter();
	const { conversationId, isOpen } = useConversation();

	const pusherKey = useMemo(() => {
		return session.data?.user?.email;
	}, [session.data?.user?.email]);

	useEffect(() => {
		if (!pusherKey) {
			return;
		}

		pusherClient.subscribe(pusherKey);

		const newHandler = (conversation: FullConversationType) => {
			setItems((current) => {
				if (find(current, { id: conversation.id })) {
					return current;
				}

				return [conversation, ...current];
			});
		};

		const updateHandler = (conversation: FullConversationType) => {
			setItems((current) =>
				current.map((currentConversation) => {
					if (currentConversation.id === conversation.id) {
						return {
							...currentConversation,
							messages: conversation.messages,
						};
					}

					return currentConversation;
				}),
			);
		};

		const removeHandler = (conversation: FullConversationType) => {
			setItems((current) => {
				return [...current.filter((item) => item.id !== conversation.id)];
			});

			if (conversationId === conversation.id) {
				router.push("/conversations");
			}
		};

		pusherClient.bind("conversation:new", newHandler);
		pusherClient.bind("conversation:update", updateHandler);
		pusherClient.bind("conversation:remove", removeHandler);

		return () => {
			pusherClient.unsubscribe(pusherKey);
			pusherClient.unbind("conversation:new", newHandler);
			pusherClient.unbind("conversation:update", updateHandler);
			pusherClient.unbind("conversation:remove", removeHandler);
		};
	}, [pusherKey, conversationId, router]);

	return (
		<>
			<GroupChatModal
				users={users}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>

			<aside
				className={clsx(
					"fixed inset-y-0 pb-20 lg:lb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-800",
					isOpen ? "hidden" : "block w-full left-0",
				)}
			>
				<div className="px-5">
					<div className="flex justify-between pt-6">
						<div className="text-2xl font-bold text-slate-50">Messages</div>

						<div
							onClick={() => setIsModalOpen(true)}
							className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition duration-500"
						>
							<MdOutlineGroupAdd size={20} />
						</div>
					</div>

					<div className="flex flex-col gap-2 mt-6 lg:mt-8">
						{items.map((item) => (
							<ConversationBox
								key={item.id}
								data={item}
								selected={conversationId === item.id}
							/>
						))}
					</div>
				</div>
			</aside>
		</>
	);
}

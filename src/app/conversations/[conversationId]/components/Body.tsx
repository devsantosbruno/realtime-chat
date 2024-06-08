"use client";

import { useConversation } from "@/app/hooks";
import type { FullMessageType } from "@/app/types";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MessageBox } from "./MessageBox";

type BodyProps = {
	initialMessages: FullMessageType[];
};

export function Body({ initialMessages }: BodyProps) {
	const [messages, setMessages] = useState(initialMessages);
	const bottomRef = useRef<HTMLDivElement>(null);

	const { conversationId } = useConversation();

	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`);
	}, [conversationId]);

	return (
		<div className="flex-1 overflow-y-auto">
			{messages.map((message, i) => (
				<MessageBox
					isLast={i === messages.length - 1}
					key={message.id}
					data={message}
				/>
			))}
			<div className="pt-24" ref={bottomRef} />
		</div>
	);
}

"use client";

import { EmptyState } from "@components";
import { useConversation } from "@hooks";
import clsx from "clsx";

export default function Conversations() {
	const { isOpen } = useConversation();

	return (
		<div
			className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
		>
			<EmptyState />
		</div>
	);
}

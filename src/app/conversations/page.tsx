"use client";

import { useConversation } from "@hooks";
import clsx from "clsx";
import { EmptyState } from "../components";

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

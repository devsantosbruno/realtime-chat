"use client";

import { useConversation, useRoutes } from "@hooks";
import { MobileItem } from "./MobileItem";

export function MobileFooter() {
	const routes = useRoutes();
	const { isOpen } = useConversation();

	if (isOpen) {
		return null;
	}

	return (
		<div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t lg:hidden">
			{routes.map((item) => (
				<MobileItem
					key={item.href}
					href={item.href}
					active={item.active}
					icon={item.icon}
					onClick={item.onClick}
				/>
			))}
		</div>
	);
}

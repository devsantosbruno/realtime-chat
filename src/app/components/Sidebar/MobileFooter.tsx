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
		<div className="fixed p-3 flex items-center justify-evenly gap-3 w-full bottom-0 z-40 bg-black border-t border-slate-800 lg:hidden">
			{routes.map((item) => (
				<MobileItem
					key={item.href}
					href={item.href}
					active={item.active}
					icon={item.icon}
				/>
			))}
		</div>
	);
}

"use client";

import { Avatar } from "@components";
import { useRoutes } from "@hooks";
import type { User } from "@prisma/client";
import { useState } from "react";
import { DesktopItem } from "./DesktopItem";
import { SettingsModal } from "./SettingsModal";

type DesktopSidebarProps = {
	currentUser: User;
};

export function DesktopSidebar({ currentUser }: DesktopSidebarProps) {
	const routes = useRoutes();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<SettingsModal
				currentUser={currentUser}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>

			<div className="hidden lg:fixed inset-y-0 left-0 z-40 w-20 overflow-y-auto bg-black border-r border-slate-800 pb-4 lg:flex flex-col justify-between xl:px-6">
				<nav className="mt-4 flex flex-col justify-between">
					<ul className="flex flex-col items-center space-y-1">
						{routes.map((item) => (
							<DesktopItem
								key={item.label}
								href={item.href}
								label={item.label}
								icon={item.icon}
								active={item.active}
								onClick={item.onClick}
							/>
						))}
					</ul>
				</nav>

				<nav className="mt-4 flex flex-col justify-between items-center">
					<div
						onClick={() => setIsOpen(true)}
						className="cursor-pointer hover:opacity-75 transition duration-500"
					>
						<Avatar user={currentUser} />
					</div>
				</nav>
			</div>
		</>
	);
}

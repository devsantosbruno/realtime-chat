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

			<div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 lg:overflow-y-auto lg:bg-white lg:border-r lg:pb-4 lg:flex lg:flex-col justify-between xl:px-6">
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
						className="cursor-pointer hover:opacity-75 transition"
					>
						<Avatar user={currentUser} />
					</div>
				</nav>
			</div>
		</>
	);
}

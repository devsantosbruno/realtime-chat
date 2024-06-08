"use client";

import type { User } from "@prisma/client";
import Image from "next/image";
import { useActiveList } from "../hooks";

type AvatarProps = {
	user?: User;
};

export function Avatar({ user }: AvatarProps) {
	const { members } = useActiveList();
	const isActive = members.indexOf(user?.email!) !== -1;

	return (
		<div className="relative">
			<div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
				<Image
					alt="Avatar"
					src={user?.image ?? "/images/placeholder.png"}
					fill
				/>
			</div>

			{isActive && (
				<span className="absolute top-0 right-0 h-3 w-3 block rounded-full bg-green-500 border-2 border-white" />
			)}
		</div>
	);
}

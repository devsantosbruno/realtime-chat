"use client";

import { Avatar, LoadingModal } from "@components";
import type { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type UserBoxProps = {
	data: User;
};

export function UserBox({ data }: UserBoxProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = useCallback(() => {
		setIsLoading(true);

		axios
			.post("/api/conversations", {
				userId: data.id,
			})
			.then((data) => router.push(`/conversations/${data.data.id}`))
			.finally(() => setIsLoading(false));
	}, [data, router]);

	return (
		<>
			{isLoading && <LoadingModal />}

			<div
				onClick={handleClick}
				className="w-full relative flex items-center space-x-3 border border-slate-800 hover:border-lime-400 p-3 rounded-lg transition duration-500 cursor-pointer"
			>
				<Avatar user={data} />

				<div className="min-w-0 flex-1 focus:outline-none flex justify-between items-center">
					<p className="text-sm font-medium text-slate-50">{data.name}</p>
				</div>
			</div>
		</>
	);
}

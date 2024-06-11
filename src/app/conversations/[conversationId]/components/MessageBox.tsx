"use client";

import { Avatar } from "@components";
import type { FullMessageType } from "@types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { ImageModal } from "./ImageModal";

type MessageBoxProps = {
	data: FullMessageType;
	isLast?: boolean;
};

export function MessageBox({ isLast = false, data }: MessageBoxProps) {
	const session = useSession();
	const [imageModalOpen, setImageModalOpen] = useState(false);

	const isOwn = session?.data?.user?.email === data?.sender?.email;
	const seenList = (data.seen || [])
		.filter((user) => user.email !== data?.sender?.email)
		.map((user) => user.name)
		.join(", ");

	const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
	const avatar = clsx(isOwn && "order-2");
	const body = clsx("flex flex-col gap-2", isOwn && "items-end");
	const message = clsx(
		"text-sm w-fit overflow-hidden",
		isOwn ? "bg-lime-400/60 text-white ml-8" : "bg-slate-100 mr-8",
		data.image ? "rounded-2xl p-0" : "rounded-2xl py-2 px-3",
	);

	return (
		<div className={container}>
			<div className={avatar}>
				<Avatar user={data.sender} />
			</div>

			<div className={body}>
				<div className="flex items-center gap-1">
					<p className="text-sm text-slate-50 truncate max-w-[40vw]">
						{data.sender.name}
					</p>

					<p className="text-xs text-slate-50/50">
						{format(new Date(data.createdAt), "p")}
					</p>
				</div>

				<div className={message}>
					<ImageModal
						src={data.image}
						isOpen={imageModalOpen}
						onClose={() => setImageModalOpen(false)}
					/>

					{data.image ? (
						<div className="border border-lime-400 overflow-hidden rounded-2xl">
							<Image
								alt="Image"
								src={data.image}
								onClick={() => setImageModalOpen(true)}
								className="object-cover cursor-pointer hover:scale-110 transition duration-500"
								width={288}
								height={288}
							/>
						</div>
					) : (
						<p>{data.body}</p>
					)}
				</div>

				{isLast && isOwn && seenList.length > 0 && (
					<div className="text-xs font-light text-gray-500">
						{`Seen by ${seenList}`}
					</div>
				)}
			</div>
		</div>
	);
}

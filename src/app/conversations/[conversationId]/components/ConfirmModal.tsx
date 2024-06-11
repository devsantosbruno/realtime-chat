"use client";

import { Button, Modal } from "@components";
import { DialogTitle } from "@headlessui/react";
import { useConversation } from "@hooks";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

type ConfirmModalProps = {
	onClose: () => void;
	isOpen?: boolean;
};

export function ConfirmModal({ onClose, isOpen = false }: ConfirmModalProps) {
	const router = useRouter();
	const { conversationId } = useConversation();
	const [isLoading, setIsLoading] = useState(false);

	const onDelete = useCallback(() => {
		setIsLoading(true);

		axios
			.delete(`/api/conversations/${conversationId}`)
			.then(() => {
				onClose();
				router.push("/conversations");
				router.refresh();
			})
			.catch(() => toast.error("Something went wrong!"))
			.finally(() => setIsLoading(false));
	}, [conversationId, router, onClose]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="flex flex-col sm:flex-row items-center sm:items-start">
				<div className="flex items-center justify-center rounded-full p-2 bg-red-100 mx-auto">
					<FiAlertTriangle size={24} className="text-red-600" />
				</div>

				<div className="mt-1 sm:mt-0 text-center sm:ml-4 sm:text-left">
					<DialogTitle
						as="h3"
						className="text-base font-semibold leading-6 text-slate-50"
					>
						Delete conversation
					</DialogTitle>

					<div className="mt-3">
						<p className="text-sm text-slate-50/50">
							Are you sure you want to delete this conversation? This action
							cannot be undone.
						</p>
					</div>
				</div>
			</div>

			<div className="mt-6 sm:mt-4 flex justify-end">
				<Button disabled={isLoading} onClick={onDelete} danger>
					Delete
				</Button>
			</div>
		</Modal>
	);
}

"use client";

import { Button, Input, Modal, Select } from "@components";
import type { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type GroupChatModalProps = {
	users: User[];
	onClose: () => void;
	isOpen?: boolean;
};

export function GroupChatModal({
	users,
	onClose,
	isOpen,
}: GroupChatModalProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			members: [],
		},
	});

	const members = watch("members");

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post("/api/conversations", {
				...data,
				isGroup: true,
			})
			.then(() => {
				router.refresh();
				onClose();
			})
			.catch(() => toast.error("Something went wrong"))
			.finally(() => setIsLoading(false));
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-8">
					<h2 className="text-base font-bold text-slate-50">
						Create a group chat
					</h2>

					<p className="mt-1 text-sm leading-6 text-slate-50/50">
						Create a chat with more tha 2 people.
					</p>

					<div className="mt-6 lg:mt-10 flex flex-col gap-2 lg:gap-4">
						<Input
							register={register}
							label="Name"
							id="name"
							disabled={isLoading}
							errors={errors}
							required
						/>

						<Select
							disabled={isLoading}
							label="Members"
							onChange={(value) =>
								setValue("members", value, { shouldValidate: true })
							}
							value={members}
							options={users.map((user) => ({
								value: user.id,
								label: user.name,
							}))}
						/>
					</div>
				</div>

				<div className="flex items-center justify-end">
					<Button disabled={isLoading} type="submit">
						Create
					</Button>
				</div>
			</form>
		</Modal>
	);
}

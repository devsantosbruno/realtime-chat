"use client";

import { Button, Input, Modal } from "@components";
import type { User } from "@prisma/client";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type SettingsModalProps = {
	currentUser: User;
	onClose: () => void;
	isOpen?: boolean;
};

export function SettingsModal({
	currentUser,
	onClose,
	isOpen,
}: SettingsModalProps) {
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
			name: currentUser?.name,
			image: currentUser?.image,
		},
	});

	const image = watch("image");

	const handleUpload = (result: any) => {
		setValue("image", result?.info?.secure_url, {
			shouldValidate: true,
		});
	};

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post("/api/settings", data)
			.then(() => {
				router.refresh();
				onClose();
			})
			.catch(() => toast.error("Something went wrong!"))
			.finally(() => setIsLoading(false));
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-12">
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Profile
						</h2>

						<p className="mt-1 text-sm leading-6 text-gray-600">
							Edit your public information.
						</p>

						<div className="mt-10 flex flex-col gap-y-8">
							<Input
								disabled={isLoading}
								label="Name"
								id="name"
								errors={errors}
								register={register}
								required
							/>

							<div>
								<label className="block text-sm font-medium leading-6 text-gray-900">
									Photo
								</label>

								<div className="mt-2 flex items-center gap-x-3">
									<Image
										width={48}
										height={48}
										className="rounded-full w-12 h-12"
										alt="Avatar"
										src={
											image || currentUser?.image || "/images/placeholder.png"
										}
									/>

									<CldUploadButton
										options={{ maxFiles: 1 }}
										onUpload={handleUpload}
										uploadPreset="ztcdw7i2"
									>
										<Button disabled={isLoading} secondary>
											Change
										</Button>
									</CldUploadButton>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-6 flex items-center justify-end gap-x-6">
						<Button disabled={isLoading} onClick={onClose} secondary>
							Cancel
						</Button>

						<Button disabled={isLoading} type="submit" secondary>
							Save
						</Button>
					</div>
				</div>
			</form>
		</Modal>
	);
}

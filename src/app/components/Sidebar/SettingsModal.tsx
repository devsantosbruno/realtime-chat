"use client";

import { Button, Input, Modal } from "@components";
import type { User } from "@prisma/client";
import { CLOUDINARY_UPLOAD_PRESET } from "@utils";
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

		if (data.name === currentUser?.name && data.image === null) {
			onClose();
			return setIsLoading(false);
		}

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
					<div className="border-b border-slate-800 pb-12">
						<h2 className="text-base font-semibold leading-7 text-slate-50">
							Profile
						</h2>

						<p className="mt-1 text-sm leading-6 text-slate-400">
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
								<label className="block text-sm font-medium leading-6 text-slate-50">
									Photo
								</label>

								<div className="mt-2 flex items-center gap-x-3">
									<CldUploadButton
										options={{ maxFiles: 1 }}
										onUpload={handleUpload}
										uploadPreset={CLOUDINARY_UPLOAD_PRESET}
										className="rounded-full w-12 h-12 overflow-hidden"
									>
										<Image
											width={48}
											height={48}
											className="rounded-full w-12 h-12"
											alt="Avatar"
											src={
												image || currentUser?.image || "/images/placeholder.png"
											}
										/>
									</CldUploadButton>

									<CldUploadButton
										options={{ maxFiles: 1 }}
										onUpload={handleUpload}
										uploadPreset={CLOUDINARY_UPLOAD_PRESET}
										className="text-slate-400 hover:text-slate-200 transition duration-500"
									>
										Change
									</CldUploadButton>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-6 flex justify-end">
						<Button disabled={isLoading} type="submit">
							Save
						</Button>
					</div>
				</div>
			</form>
		</Modal>
	);
}

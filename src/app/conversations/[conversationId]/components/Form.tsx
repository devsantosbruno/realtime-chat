"use client";

import { useConversation } from "@hooks";
import { CLOUDINARY_UPLOAD_PRESET } from "@utils";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { MessageInput } from "./MessageInput";

export function Form() {
	const { conversationId } = useConversation();
	const { register, handleSubmit, setValue } = useForm<FieldValues>({
		defaultValues: {
			message: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setValue("message", "", { shouldValidate: true });
		axios.post("/api/messages", {
			...data,
			conversationId,
		});
	};

	const handleUpload = (result: any) => {
		axios.post("/api/messages", {
			image: result?.info?.secure_url,
			conversationId,
		});
	};

	return (
		<div className="p-4 border-t border-slate-800 flex items-center gap-2 lg:gap-4 w-full">
			<CldUploadButton
				options={{ maxFiles: 1 }}
				onUpload={handleUpload}
				uploadPreset={CLOUDINARY_UPLOAD_PRESET}
			>
				<HiPhoto size={30} className="text-lime-500" />
			</CldUploadButton>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex items-center gap-2 lg:gap-4 w-full"
			>
				<MessageInput
					id="message"
					register={register}
					placeholder="Write a message"
					required
				/>

				<button
					type="submit"
					className="rounded-full p-2 bg-lime-500 hover:bg-lime-600 transition duration-500"
				>
					<HiPaperAirplane size={18} className="text-white" />
				</button>
			</form>
		</div>
	);
}

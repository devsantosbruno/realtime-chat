import type { FieldValues, UseFormRegister } from "react-hook-form";

type MessageInputProps = {
	id: string;
	register: UseFormRegister<FieldValues>;
	placeholder: string;
	required?: boolean;
	type?: string;
};

export function MessageInput({
	id,
	register,
	placeholder,
	type = "text",
	required = false,
}: MessageInputProps) {
	return (
		<div className="relative w-full">
			<input
				id={id}
				type={type}
				autoComplete={id}
				placeholder={placeholder}
				{...register(id, { required, pattern: /\S/ })}
				className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
			/>
		</div>
	);
}

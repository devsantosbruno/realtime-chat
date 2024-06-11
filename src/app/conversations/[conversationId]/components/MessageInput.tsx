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
				className="text-white placeholder:text-white placeholder:text-sm font-light py-2 px-4 bg-[#242424] w-full rounded-full border border-transparent focus:border-lime-400 focus:outline-none transition duration-500"
				{...register(id, { required, pattern: /\S/ })}
			/>
		</div>
	);
}

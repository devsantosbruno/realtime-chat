import type {
	FieldErrors,
	FieldValues,
	UseFormRegister,
} from "react-hook-form";

type MessageInputProps = {
	id: string;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	placeholder: string;
	required?: boolean;
	type?: string;
};

export function MessageInput({
	id,
	register,
	errors,
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
				{...register(id, { required })}
				className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
			/>
		</div>
	);
}

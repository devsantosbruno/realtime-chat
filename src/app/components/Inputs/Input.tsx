"use client";

import clsx from "clsx";
import type {
	FieldErrors,
	FieldValues,
	UseFormRegister,
} from "react-hook-form";

type InputProps = {
	label: string;
	id: string;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	type?: string;
	required?: boolean;
	disabled?: boolean;
};

export function Input({
	label,
	id,
	register,
	errors,
	type = "text",
	required = false,
	disabled = false,
}: InputProps) {
	return (
		<div>
			<label
				htmlFor={id}
				className="block text-sm font-light leading-6 text-slate-50"
			>
				{label}
			</label>

			<div className="mt-2">
				<input
					id={id}
					type={type}
					autoComplete={id}
					disabled={disabled}
					{...register(id, { required })}
					className={clsx(
						"form-input bg-transparent block w-full rounded-md py-1.5 text-slate-50 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 border border-gray-800 focus:border-lime-400 focus:ring-0 focus:outline-none transition duration-500",
						errors[id] && "focus:border-rose-500",
						disabled && "opacity-50 cursor-default",
					)}
				/>
			</div>
		</div>
	);
}

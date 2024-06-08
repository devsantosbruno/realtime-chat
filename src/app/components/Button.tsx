import clsx from "clsx";

type ButtonProps = {
	type?: "button" | "submit" | "reset";
	fullWidth?: boolean;
	children?: React.ReactNode;
	onClick?: () => void;
	secondary?: boolean;
	danger?: boolean;
	disabled?: boolean;
};

export function Button({
	type = "button",
	fullWidth = false,
	children = false,
	onClick = () => null,
	secondary = false,
	danger = false,
	disabled = false,
}: ButtonProps) {
	return (
		<button
			onClick={onClick}
			type={type}
			disabled={disabled}
			className={clsx(
				"flex justify-center rounded-md px-3 py-2 text-sm font-semibold transition duration-500",
				disabled && "opacity-50 cursor-default",
				fullWidth && "w-full",
				secondary ? "text-gray-900" : "text-white",
				danger && "bg-rose-500 hover:bg-rose-600",
				!secondary && !danger && "bg-sky-500 hover:bg-sky-600",
			)}
		>
			{children}
		</button>
	);
}

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
				"flex justify-center rounded-md px-3 py-2 text-sm font-light transition duration-500",
				disabled && "opacity-50 cursor-default",
				fullWidth && "w-full",
				secondary && "text-gray-900",
				danger && "bg-rose-500 hover:bg-rose-600 text-slate-50",
				!secondary && !danger && "text-slate-900 bg-slate-50 hover:bg-lime-400",
			)}
		>
			{children}
		</button>
	);
}

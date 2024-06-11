import clsx from "clsx";
import Link from "next/link";
import type { IconType } from "react-icons";

type DesktopItemProps = {
	label: string;
	href: string;
	icon: IconType;
	active?: boolean;
	onClick?: () => void;
};

export function DesktopItem({
	label,
	href,
	icon: Icon,
	active = false,
	onClick = () => null,
}: DesktopItemProps) {
	function handleClick() {
		if (onClick) {
			return onClick();
		}
	}

	return (
		<li onClick={handleClick}>
			<Link
				href={href}
				className={clsx(
					"group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold hover:bg-lime-400 hover:text-black transition duration-500",
					active && "bg-lime-400 text-black",
					!active && "text-white",
				)}
			>
				<Icon className="h-6 w-6 shrink-0" />
				<span className="sr-only">{label}</span>
			</Link>
		</li>
	);
}

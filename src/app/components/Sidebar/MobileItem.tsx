import clsx from "clsx";
import Link from "next/link";
import type { IconType } from "react-icons";

type MobileItemProps = {
	href: string;
	icon: IconType;
	active?: boolean;
	onClick?: () => void;
};

export function MobileItem({
	href,
	icon: Icon,
	active = false,
	onClick = () => null,
}: MobileItemProps) {
	return (
		<Link
			onClick={onClick}
			href={href}
			className={clsx(
				"group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100 transition duration-500",
				active && "bg-gray-100 text-black",
			)}
		>
			<Icon className="h-6 w-6" />
		</Link>
	);
}

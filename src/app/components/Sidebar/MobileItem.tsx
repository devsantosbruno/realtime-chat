import clsx from "clsx";
import Link from "next/link";
import type { IconType } from "react-icons";

type MobileItemProps = {
	href: string;
	icon: IconType;
	active?: boolean;
};

export function MobileItem({
	href,
	icon: Icon,
	active = false,
}: MobileItemProps) {
	return (
		<Link
			href={href}
			className={clsx(
				"flex justify-center p-3 text-sm rounded-2xl transition duration-500",
				!active && "text-slate-50 bg-transparent",
				active && "bg-lime-400 text-black",
			)}
		>
			<Icon className="h-6 w-6" />
		</Link>
	);
}

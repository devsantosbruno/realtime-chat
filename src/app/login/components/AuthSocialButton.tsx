import type { IconType } from "react-icons";

type AuthSocialButtonProps = {
	Icon: IconType;
	onClick: () => void;
};

export function AuthSocialButton({ Icon, onClick }: AuthSocialButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm hover:bg-gray-50 transition duration-500"
		>
			<Icon />
		</button>
	);
}

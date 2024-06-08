import type { IconType } from "react-icons";

type AuthSocialButtonProps = {
	Icon: IconType;
	onClick: () => void;
};

export function AuthSocialButton({ Icon, onClick }: AuthSocialButtonProps) {
	return (
		<button type="button" onClick={onClick} className="inline-flex w-fit">
			<Icon
				size={24}
				className="text-slate-50 hover:text-lime-400 transition duration-500"
			/>
		</button>
	);
}

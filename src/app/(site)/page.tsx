import Image from "next/image";
import { AuthForm } from "./components";

export default function Login() {
	return (
		<div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#09090B]">
			<Image
				alt="Logo"
				height={160}
				width={160}
				className="mx-auto w-auto"
				src="/images/logoWhite.png"
			/>

			<AuthForm />
		</div>
	);
}

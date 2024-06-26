"use client";

import { Button, Input } from "@components";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { AuthSocialButton } from "./AuthSocialButton";

type Variant = "LOGIN" | "REGISTER";

export function AuthForm() {
	const session = useSession();
	const router = useRouter();
	const [variant, setVariant] = useState<Variant>("LOGIN");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (session?.status === "authenticated") {
			router.push("/users");
		}
	}, [session?.status, router]);

	const toggleVariant = useCallback(() => {
		if (variant === "LOGIN") {
			setVariant("REGISTER");
		} else {
			setVariant("LOGIN");
		}
	}, [variant]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		if (variant === "REGISTER") {
			axios
				.post("/api/register", data)
				.then(() => signIn("credentials", data))
				.catch(() => toast.error("Something went wrong!"))
				.finally(() => setIsLoading(false));
		}

		if (variant === "LOGIN") {
			signIn("credentials", {
				...data,
				redirect: false,
			})
				.then((callback) => {
					if (callback?.error) {
						toast.error("Invalid credentials");
					}

					if (callback?.ok && !callback?.error) {
						toast.success("Logged in!");
						router.push("/users");
					}
				})
				.finally(() => setIsLoading(false));
		}
	};

	const socialAction = (action: "github" | "google") => {
		setIsLoading(true);

		signIn(action, { redirect: false })
			.then((callback) => {
				if (callback?.error) {
					toast.error("Invalid Credentials");
				}

				if (callback?.ok && !callback?.error) {
					toast.error("Logged In");
				}
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md">
			<div className="bg-black shadow shadow-lime-400 px-4 py-8 sm:rounded-lg sm:px-10">
				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					{variant === "REGISTER" && (
						<Input
							id="name"
							label="Name"
							register={register}
							errors={errors}
							disabled={isLoading}
						/>
					)}
					<Input
						id="email"
						label="Email"
						type="email"
						register={register}
						errors={errors}
						disabled={isLoading}
					/>
					<Input
						id="password"
						label="Password"
						type="password"
						register={register}
						errors={errors}
						disabled={isLoading}
					/>

					<div>
						<Button disabled={isLoading} type="submit" fullWidth>
							{variant === "LOGIN" ? "Sign in" : "Register"}
						</Button>
					</div>
				</form>

				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300" />
						</div>

						<div className="relative flex justify-center text-sm">
							<span className="bg-black px-2 text-gray-500">
								Or continue with
							</span>
						</div>
					</div>

					<div className="mt-6 flex justify-evenly gap-2">
						<AuthSocialButton
							Icon={BsGithub}
							onClick={() => socialAction("github")}
						/>
						<AuthSocialButton
							Icon={BsGoogle}
							onClick={() => socialAction("google")}
						/>
					</div>
				</div>

				<div className="flex gap-2 justify-center text-sm mt-6 px-2 text-slate-50">
					<div>
						{variant === "LOGIN"
							? "New to Messenger?"
							: "Already have an account?"}
					</div>
					<button
						type="button"
						onClick={toggleVariant}
						className="underline hover:text-lime-400 transition duration-500"
					>
						{variant === "LOGIN" ? "Create an account" : "Login"}
					</button>
				</div>
			</div>
		</div>
	);
}

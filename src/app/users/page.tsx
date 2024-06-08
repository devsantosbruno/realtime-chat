"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { EmptyState } from "../components";

export default function Users() {
	const session = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session.status === "unauthenticated") {
			router.push("/");
		}
	}, [session, router]);

	return (
		<div className="hidden lg:block lg:pl-80 h-full">
			<EmptyState />
		</div>
	);
}

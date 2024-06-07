import { Sidebar } from "@/app/components/Sidebar";

export default async function UsersLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<Sidebar>
			<div className="h-screen">{children}</div>
		</Sidebar>
	);
}

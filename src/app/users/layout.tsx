import { getUsers } from "@/app/actions";
import { Sidebar } from "@/app/components/Sidebar";
import { UserList } from "./components/UserList";

export default async function UsersLayout({
	children,
}: { children: React.ReactNode }) {
	const users = await getUsers();

	return (
		<Sidebar>
			<UserList items={users} />
			<div className="h-screen">{children}</div>
		</Sidebar>
	);
}

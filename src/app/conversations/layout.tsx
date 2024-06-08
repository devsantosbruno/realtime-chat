import { getConversations, getUsers } from "@/app/actions";
import { Sidebar } from "../components";
import { ConversationList } from "./components/";

export default async function ConversationsLayout({
	children,
}: { children: React.ReactNode }) {
	const conversations = await getConversations();
	const users = await getUsers();

	return (
		<Sidebar>
			<div className="h-full">
				<ConversationList users={users} initialItems={conversations} />
				{children}
			</div>
		</Sidebar>
	);
}

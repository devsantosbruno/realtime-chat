import { getConversations } from "@/app/actions";
import { Sidebar } from "../components";
import { ConversationList } from "./components/ConversationList";

export default async function ConversationsLayout({
	children,
}: { children: React.ReactNode }) {
	const conversations = await getConversations();

	return (
		<Sidebar>
			<div className="h-full">
				<ConversationList initialItems={conversations} />
				{children}
			</div>
		</Sidebar>
	);
}

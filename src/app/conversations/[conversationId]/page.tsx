import { getConversationById, getMessages } from "@/app/actions";
import { EmptyState } from "@/app/components";
import { Body, Form, Header } from "./components";

type IParams = {
	conversationId: string;
};

export default async function ConversationId({ params }: { params: IParams }) {
	const conversation = await getConversationById(params.conversationId);
	const messages = await getMessages(params.conversationId);

	if (!conversation) {
		return (
			<div className="lg:pl-80 h-full">
				<div className="h-full flex flex-col">
					<EmptyState />
				</div>
			</div>
		);
	}

	return (
		<div className="lg:pl-80 h-full">
			<div className="h-full flex flex-col">
				<Header conversation={conversation} />
				<Body initialMessages={messages} />
				<Form />
			</div>
		</div>
	);
}

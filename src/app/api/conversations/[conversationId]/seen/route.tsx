import { getCurrentUser } from "@actions";
import prisma, { pusherServer } from "@libs";
import { NextResponse } from "next/server";

type IParams = {
	conversationId?: string;
};

export async function POST(request: Request, { params }: { params: IParams }) {
	try {
		const currentUser = await getCurrentUser();
		const { conversationId } = params;

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const conversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				messages: {
					include: {
						seen: true,
					},
				},
				users: true,
			},
		});

		if (!conversation) {
			return new NextResponse("Invalid ID", { status: 400 });
		}

		const lastMessage = conversation.messages[conversation.messages.length - 1];

		if (!lastMessage) {
			return NextResponse.json(conversation);
		}

		const updatedMessage = await prisma.message.update({
			where: {
				id: lastMessage.id,
			},
			include: {
				sender: true,
				seen: true,
			},
			data: {
				seen: {
					connect: {
						id: currentUser.id,
					},
				},
			},
		});

		await pusherServer.trigger(currentUser.email, "conversation:update", {
			id: conversationId,
			messages: [updatedMessage],
		});

		if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
			return NextResponse.json(conversation);
		}

		await pusherServer.trigger(
			conversationId!,
			"message:update",
			updatedMessage,
		);

		return NextResponse.json(updatedMessage);
	} catch (error) {
		console.error("ERROR_MESSAGE_SEEN ==>", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

import { getCurrentUser } from "@actions";
import prisma from "@libs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser();
		const body = await request.json();
		const { name, image } = body;

		if (!currentUser?.id) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: currentUser.id,
			},
			data: {
				image: image,
				name: name,
			},
		});

		return NextResponse.json(updatedUser);
	} catch (error) {
		console.error(error, "ERROR_SETTINGS");
		return new NextResponse("Internal Error", { status: 500 });
	}
}

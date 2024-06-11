import { authOptions } from "@config";
import { getServerSession } from "next-auth";

export async function getSession() {
	return await getServerSession(authOptions);
}

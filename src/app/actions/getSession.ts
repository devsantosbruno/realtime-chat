import { getServerSession } from "next-auth";
import { authOptions } from "../config/authOptions";

export async function getSession() {
	return await getServerSession(authOptions);
}

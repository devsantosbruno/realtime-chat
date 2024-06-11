import { getCurrentUser } from "@actions";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileFooter } from "./MobileFooter";

export async function Sidebar({ children }: { children: React.ReactNode }) {
	const currentUser = await getCurrentUser();

	return (
		<div className="h-screen">
			{/* @ts-ignore */}
			<DesktopSidebar currentUser={currentUser} />
			<MobileFooter />
			<main className="lg:pl-20 h-full">{children}</main>
		</div>
	);
}

import type { User } from "@prisma/client";
import { UserBox } from "./UserBox";

type UserListProps = {
	items: User[];
};

export function UserList({ items }: UserListProps) {
	return (
		<aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 overflow-y-auto border-r border-gray-800 block w-full left-0">
			<div className="px-5">
				<div className="text-2xl font-bold text-slate-50 pt-6">Peoples</div>

				<div className="flex flex-col gap-2 mt-6 lg:mt-8">
					{items.map((item) => (
						<UserBox key={item.id} data={item} />
					))}
				</div>
			</div>
		</aside>
	);
}

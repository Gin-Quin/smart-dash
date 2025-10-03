import type { User } from "$lib/databases/main/client";
import { mainDB } from "$lib/databases/main/mainDB";
import { getRequestUserId } from "./getRequestUserId";

export const getRequestUser = async (): Promise<User | null> => {
	const userId = await getRequestUserId();
	if (!userId) return null;
	const user = await mainDB.user.findUnique({ where: { id: userId } });
	return user;
};

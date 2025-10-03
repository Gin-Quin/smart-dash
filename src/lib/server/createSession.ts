import { mainDB } from "$lib/databases/main/mainDB";
import { createId } from "@paralleldrive/cuid2";

export async function createSession(userId: string): Promise<string> {
	const bearer = createId();

	await mainDB.session.create({
		data: { id: bearer, userId },
	});

	return bearer;
}

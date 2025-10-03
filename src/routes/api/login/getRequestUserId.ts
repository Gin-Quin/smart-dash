import { mainDB } from "$lib/databases/main/mainDB";
import { getRequestBearerToken } from "./getRequestBearerToken";

export const getRequestUserId = async (): Promise<string | null> => {
	const bearerToken = getRequestBearerToken();
	console.log("Getting current user with bearer token:", bearerToken);

	if (!bearerToken) return null;

	const session = await mainDB.session.findFirst({
		where: { id: bearerToken },
	});

	console.log("Found session:", session);

	return session?.userId ?? null;
};

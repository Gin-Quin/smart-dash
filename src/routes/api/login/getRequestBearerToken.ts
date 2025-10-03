import { getRequestEvent } from "$app/server";

export const getRequestBearerToken = (): string | null => {
	const { request } = getRequestEvent();
	return request.headers.get("authorization")?.slice("Bearer ".length) ?? null;
};

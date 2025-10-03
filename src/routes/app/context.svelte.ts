import type { User } from "$lib/databases/main/client";

export type Context = {
	user: User;
};

export const context = $state<Context>({ user: null });

export const setContextUser = (user: User | null) => {
	context.user = user;
	localStorage.setItem("user", JSON.stringify(user));
};

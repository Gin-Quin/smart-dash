import type { Project, User } from "$lib/databases/main/generated/client";

export type UserWithProjects = User & {
	projects: Project[];
};

export type Context = {
	user?: UserWithProjects;
};

export const context = $state<Context>({});

export function setContext(values: Partial<Context>) {
	Object.assign(context, values);
	localStorage.setItem("context", JSON.stringify(context));
}

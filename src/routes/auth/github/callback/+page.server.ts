import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getUserInfo } from "$lib/services/github/getUserInfo";
import type { GitHubUser } from "$lib/services/github/github";
import { mainDB } from "$lib/databases/main/mainDB";
import { createSession } from "$lib/services/login/createSession";

export const load: PageServerLoad = async ({
	url,
	cookies,
}): Promise<{ session: string }> => {
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies.get("github_oauth_state");

	console.log({
		code,
		state,
		storedState,
	});

	// Validate state for CSRF protection
	if (!code || !state || !storedState || state !== storedState) {
		redirect(302, "/auth/error");
	}

	// Clear the state cookie
	cookies.delete("github_oauth_state", { path: "/" });

	let githubUser: GitHubUser;

	try {
		// Get user info from GitHub
		githubUser = await getUserInfo(code);
	} catch (error) {
		console.error("GitHub OAuth error:", error);
		redirect(302, "/auth/error");
	}

	console.log("GITHUB user:", githubUser);

	const user = await mainDB.user.upsert({
		where: { email: githubUser.email },
		create: githubUser,
		update: githubUser,
	});

	const session = await createSession(user.id);

	return { session };
};

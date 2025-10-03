import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getUserInfo } from "$lib/services/google/getUserInfo";
import type { GoogleUser } from "$lib/services/google/google";
import { mainDB } from "$lib/databases/main/mainDB";
import { createSession } from "$lib/services/login/createSession";

export const load: PageServerLoad = async ({
	url,
	cookies,
}): Promise<{ session: string }> => {
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies.get("google_oauth_state");
	const codeVerifier = cookies.get("google_oauth_code_verifier");

	console.log({
		code,
		state,
		storedState,
		codeVerifier,
	});

	// Validate state for CSRF protection and code verifier
	if (
		!code ||
		!state ||
		!storedState ||
		!codeVerifier ||
		state !== storedState
	) {
		redirect(302, "/auth/error");
	}

	// Clear the state and code verifier cookies
	cookies.delete("google_oauth_state", { path: "/" });
	cookies.delete("google_oauth_code_verifier", { path: "/" });

	let googleUser: GoogleUser;

	try {
		// Get user info from Google
		googleUser = await getUserInfo(code, codeVerifier);
	} catch (error) {
		console.error("Google OAuth error:", error);
		redirect(302, "/auth/error");
	}

	console.log("GOOGLE user:", googleUser);

	const user = await mainDB.user.upsert({
		where: { email: googleUser.email },
		create: googleUser,
		update: googleUser,
	});

	const session = await createSession(user.id);

	return { session };

	// redirect(302, `/app?email=${encodeURIComponent(user.email)}`);
};

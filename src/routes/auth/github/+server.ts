import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { generateState } from "arctic";
import { getAuthorizationUrl } from "$lib/services/github/getAuthorizationUrl";

export const GET: RequestHandler = async ({ cookies }) => {
	// Generate a random state for CSRF protection
	const state = generateState();

	// Store state in cookies for validation later
	cookies.set("github_oauth_state", state, {
		path: "/",
		httpOnly: true,
		maxAge: 60 * 10, // 10 minutes
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
	});

	// Get the authorization URL and redirect user to GitHub
	const url = getAuthorizationUrl(state);

	redirect(302, url.toString());
};

import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { generateCodeVerifier, generateState } from "arctic";
import { getAuthorizationUrl } from "$lib/services/google/getAuthorizationUrl";

export const GET: RequestHandler = async ({ cookies }) => {
	// Generate a random state for CSRF protection
	const state = generateState();

	// Generate PKCE code verifier
	const codeVerifier = generateCodeVerifier();

	// Store state and code verifier in cookies for validation later
	cookies.set("google_oauth_state", state, {
		path: "/",
		httpOnly: true,
		maxAge: 60 * 10, // 10 minutes
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
	});

	cookies.set("google_oauth_code_verifier", codeVerifier, {
		path: "/",
		httpOnly: true,
		maxAge: 60 * 10, // 10 minutes
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
	});

	// Get the authorization URL and redirect user to Google
	const url = getAuthorizationUrl(state, codeVerifier);

	redirect(302, url.toString());
};

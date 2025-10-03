import { google } from "./google";

/**
 * Get the authorization URL to redirect users to Google login
 */
export function getAuthorizationUrl(state: string, codeVerifier: string): URL {
	const scopes = ["email", "profile"];
	const response = google.createAuthorizationURL(state, codeVerifier, scopes);
	return response;
}

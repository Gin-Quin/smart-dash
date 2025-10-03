import { github } from "./github";

/**
 * Get the authorization URL to redirect users to GitHub login
 */
export function getAuthorizationUrl(state: string): URL {
	const scopes = ["user:email"];
	const response = github.createAuthorizationURL(state, scopes);
	return response;
}

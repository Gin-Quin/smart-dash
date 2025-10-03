import { env } from "$env/dynamic/private";
import { GitHub } from "arctic";

// Validate environment variables
if (
	!env.GITHUB_CLIENT_ID ||
	!env.GITHUB_CLIENT_SECRET
) {
	throw new Error("Missing required GitHub OAuth environment variables");
}

// Initialize GitHub OAuth client
export const github = new GitHub(
	env.GITHUB_CLIENT_ID,
	env.GITHUB_CLIENT_SECRET,
	null, // GitHub doesn't require redirect URI in the client initialization
);

// Type for GitHub user info
export type GitHubUser = {
	email: string;
	name: string;
	picture: string;
};

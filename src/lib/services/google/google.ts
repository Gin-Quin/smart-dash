import { env } from "$env/dynamic/private";
import { Google } from "arctic";

// Validate environment variables
if (
	!env.GOOGLE_CLIENT_ID ||
	!env.GOOGLE_CLIENT_SECRET ||
	!env.GOOGLE_REDIRECT_URI
) {
	throw new Error("Missing required Google OAuth environment variables");
}

// Initialize Google OAuth client
export const google = new Google(
	env.GOOGLE_CLIENT_ID,
	env.GOOGLE_CLIENT_SECRET,
	env.GOOGLE_REDIRECT_URI,
);

// Type for Google user info
export type GoogleUser = {
	email: string;
	name: string;
	picture: string;
};

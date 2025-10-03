import { google, type GoogleUser } from "./google";

/**
 * Exchange authorization code for access token and fetch user info
 */
export async function getUserInfo(
	code: string,
	codeVerifier: string,
): Promise<GoogleUser> {
	// Exchange code for tokens
	const tokens = await google.validateAuthorizationCode(code, codeVerifier);

	// Fetch user info from Google
	const response = await fetch(
		"https://www.googleapis.com/oauth2/v2/userinfo",
		{
			headers: {
				Authorization: `Bearer ${tokens.accessToken()}`,
			},
		},
	);

	console.log("GOOGLE response:", response);

	if (!response.ok) {
		throw new Error("Failed to fetch user info from Google");
	}

	const data = await response.json();

	console.log("User data:", data);

	return {
		email: data.email,
		name: data.name,
		picture: data.picture,
	};
}

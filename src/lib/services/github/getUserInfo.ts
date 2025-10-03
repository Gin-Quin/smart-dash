import { github, type GitHubUser } from "./github";

/**
 * Exchange authorization code for access token and fetch user info
 */
export async function getUserInfo(code: string): Promise<GitHubUser> {
	// Exchange code for tokens
	const tokens = await github.validateAuthorizationCode(code);

	// Fetch user info from GitHub
	const response = await fetch("https://api.github.com/user", {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`,
			Accept: "application/vnd.github.v3+json",
		},
	});

	console.log("GITHUB response:", response);

	if (!response.ok) {
		throw new Error("Failed to fetch user info from GitHub");
	}

	const data = await response.json();

	console.log("User data:", data);

	// GitHub email might be private, need to fetch separately
	let email = data.email;

	if (!email) {
		const emailResponse = await fetch("https://api.github.com/user/emails", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken()}`,
				Accept: "application/vnd.github.v3+json",
			},
		});

		if (emailResponse.ok) {
			const emails = await emailResponse.json();
			// Find primary email or first verified email
			const primaryEmail = emails.find((e: any) => e.primary && e.verified);
			email = primaryEmail?.email || emails.find((e: any) => e.verified)?.email || emails[0]?.email;
		}
	}

	return {
		email: email,
		name: data.name || data.login,
		picture: data.avatar_url,
	};
}

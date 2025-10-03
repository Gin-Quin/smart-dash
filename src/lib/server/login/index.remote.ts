import { command, query } from "$app/server";
import * as v from "valibot";
import { getRequestUser } from "./getRequestUser";
import { getRequestBearerToken } from "./getRequestBearerToken";
import { mainDB } from "$lib/databases/main/mainDB";
import { createAuthenticationCodes } from "./createAuthenticationCodes";
import { MINUTE } from "$lib/time/units";
import { createSession } from "../createSession";
import { sendSignInEmail } from "../email/sendSignInEmail";

/**
 * Retrieves the currently authenticated user from the request
 */
export const getCurrentUser = query(getRequestUser);

/**
 * Deletes the current user's session from the database
 */
export const clearServerSession = command(async () => {
	const bearerToken = getRequestBearerToken();
	if (!bearerToken) return null;
	await mainDB.session.delete({ where: { id: bearerToken } });
});

/**
 * Sends an authentication email with a magic link to the specified email address
 */
export const sendAuthenticationEmail = command(
	v.object({
		email: v.string(),
	}),
	async ({ email }): Promise<"success" | "user not found"> => {
		console.log("Sending magic link email:", email);

		// Check if user exists, if not create one
		const user = await mainDB.user.findUnique({ where: { email } });

		if (!user) {
			return "user not found";
		}

		// Create magic link token
		const codes = await createAuthenticationCodes(email);

		// Send magic link email
		await sendSignInEmail(email, codes);

		return "success";
	},
);

/**
 * Verifies a magic link token and creates a session if valid
 */
export const verifyMagicLink = command(
	v.object({ email: v.string(), token: v.string() }),
	async ({ email, token }): Promise<string | null> => {
		const verification = await mainDB.authenticationToken.findFirst({
			where: {
				email,
				token,
			},
		});

		if (!verification) {
			console.log("Verification not found");
			return null;
		}

		if (Date.now() > verification.createdAt.getTime() + 15 * MINUTE) {
			console.log("Token expired");
			await mainDB.authenticationToken.delete({
				where: { id: verification.id },
			});
			return null;
		}

		const user = await mainDB.user.findUnique({
			select: { id: true },
			where: { email },
		});

		if (!user) {
			console.log("User not found");
			return null;
		}

		void mainDB.authenticationToken.delete({ where: { id: verification.id } });

		return await createSession(user.id);
	},
);

/**
 * Verifies a 6-digit authentication code and creates a session if valid
 */
export const verifyCode = command(
	v.object({ email: v.string(), code: v.string() }),
	async ({ email, code }): Promise<string | null> => {
		const verification = await mainDB.authenticationToken.findFirst({
			where: { email },
		});

		if (!verification) {
			console.log("Verification not found");
			return null;
		}

		if (
			Date.now() > verification.createdAt.getTime() + 15 * MINUTE ||
			verification.attempts > 5
		) {
			console.log("Token expired or max attempts reached");
			void mainDB.authenticationToken.delete({
				where: { id: verification.id },
			});
			return null;
		}

		if (code !== verification.code) {
			console.log("Invalid code");
			await mainDB.authenticationToken.update({
				where: { id: verification.id },
				data: { attempts: { increment: 1 } },
			});
			return null;
		}

		const user = await mainDB.user.findUnique({
			select: { id: true },
			where: { email },
		});

		if (!user) {
			console.log("User not found");
			return null;
		}

		return await createSession(user.id);
	},
);

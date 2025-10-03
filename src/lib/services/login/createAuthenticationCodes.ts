import { mainDB } from "$lib/databases/main/mainDB";
import { createId } from "@paralleldrive/cuid2";

function generateToken(): string {
	return createId();
}

function generateCode(): string {
	return new Array(6)
		.fill(0)
		.map(() => Math.floor(Math.random() * 10))
		.join("");
}

export async function createAuthenticationCodes(
	email: string,
): Promise<{ code: string; token: string }> {
	const id = createId();
	const code = generateCode();
	const token = generateToken();

	await mainDB.authenticationToken.deleteMany({ where: { email } });

	await mainDB.authenticationToken.create({
		data: { id, email, code, token },
	});

	return { code, token };
}

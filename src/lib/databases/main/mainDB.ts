import { PrismaClient } from "./client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

import { env } from "$env/dynamic/private";

const adapter = new PrismaLibSQL({
	url: env.TURSO_DATABASE_URL,
	authToken: env.TURSO_AUTH_TOKEN,
});

export const mainDB = new PrismaClient({ adapter });

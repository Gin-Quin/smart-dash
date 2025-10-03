import { PrismaClient } from "./client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = process.env;

if (!TURSO_DATABASE_URL) {
	throw new Error("TURSO_DATABASE_URL is not set");
}

const adapter = new PrismaLibSQL({
	url: TURSO_DATABASE_URL,
	authToken: TURSO_AUTH_TOKEN,
});

const mainDB = new PrismaClient({ adapter });

console.log("• Adding user matthieu@smart-dash.ai");

await mainDB.user.upsert({
	where: { email: "matthieu@smart-dash.ai" },
	create: {
		email: "matthieu@smart-dash.ai",
		name: "Matthieu",
		region: "europe",
	},
	update: {},
});

console.log("🪴 Database seeded successfully");

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import config from "../drizzle.config";
import { user } from "../src/Models/Schema/databaseSchema";
import { hash } from "bcrypt";

const connectionString = `postgres://${config.dbCredentials.user}:${config.dbCredentials.password}@${config.dbCredentials.host}/${config.dbCredentials.database}`;

const connection = postgres(connectionString, { max: 1 });

const db = drizzle(connection);

async function main() {
  await migrate(db, { migrationsFolder: "drizzle" });

  const ADMIN_NAME = process.env.ADMIN_NAME as string;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;
  const ADMIN_PASSWORD = await hash(process.env.ADMIN_PASSWORD as string, 10);

  await db.insert(user).values({
    name: ADMIN_NAME,
    password: ADMIN_PASSWORD,
    email: ADMIN_EMAIL,
    isAdmin: true,
  });

  await connection.end();
}

main();

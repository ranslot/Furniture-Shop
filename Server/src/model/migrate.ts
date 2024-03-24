import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import config from "../../drizzle.config";

const connectionString = `postgres://${config.dbCredentials.user}:${config.dbCredentials.password}@${config.dbCredentials.host}/${config.dbCredentials.database}`;

const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

async function main() {
  await migrate(db, { migrationsFolder: "db" });
  await sql.end();
}

main();

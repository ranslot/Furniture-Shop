import postgres from "postgres";
import config from "../drizzle.config";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../src/Models/Schema/databaseSchema";

export const connectionString = `postgres://${config.dbCredentials.user}:${config.dbCredentials.password}@${config.dbCredentials.host}/${config.dbCredentials.database}`;

const connection = postgres(connectionString);

export const db = drizzle(connection, { schema });

export default connection;

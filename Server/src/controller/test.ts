import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../model/schema";
import config from "../../drizzle.config";
import postgres from "postgres";

const connection = postgres(
  `postgres://${config.dbCredentials.user}:${config.dbCredentials.password}@${config.dbCredentials.host}/${config.dbCredentials.database}`
);

const db = drizzle(connection, { schema });

export async function qResult() {
  try {
    let data = await db.select().from(schema.mySchemaUsers).limit(1);
    return data[0];
  } catch (error) {
    console.log(error);
    return;
  }
}

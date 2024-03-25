import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./Schema/schema";
import connection from "../../Database/conection";
import DatabaseError from "../Errors/DatabaseError";

const db = drizzle(connection, { schema });

export async function qResult() {
  try {
    return await db.select().from(schema.mySchemaUsers).limit(1);
  } catch (error) {
    throw new DatabaseError("Failed to query the database");
  }
}

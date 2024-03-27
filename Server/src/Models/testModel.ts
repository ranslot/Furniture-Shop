import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./Schema/databaseSchema";
import connection from "../../Database/conection";
import DatabaseError from "../Errors/DatabaseError";
import { eq, sql } from "drizzle-orm";

const db = drizzle(connection, { schema });

export async function qResult() {
  try {
    // await db
    //   .update(schema.category)
    //   .set({ name: "Dan", modifiedAt: sql`CURRENT_TIMESTAMP` })
    //   .where(eq(schema.category.name, "Andrew"));
    return await db.select().from(schema.category).limit(1);
  } catch (error) {
    throw new DatabaseError("Failed to query the database");
  }
}

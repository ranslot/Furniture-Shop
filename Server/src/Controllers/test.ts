import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../Models/schema";
import connection from "../../Database/conection";
import { Response } from "express";

const db = drizzle(connection, { schema });

export async function qResult(response: Response) {
  try {
    const data = await db.select().from(schema.mySchemaUsers).limit(1);
    response.send({ msg: "Express + TypeScript Server", q: data[0] });
  } catch (error) {
    console.log(error);
    response.status(500).send({ msg: "Internal server error" });
  }
}

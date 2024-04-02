import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./Schema/databaseSchema";
import connection from "../../Database/conection";
import DatabaseError from "../Errors/DatabaseError";
import { eq, sql } from "drizzle-orm";

const db = drizzle(connection, { schema });

export function getAllUsers() {}

export function getUserById(id: number) {}

export function getUserByEmail(email: string) {
  return db.select().from(schema.user).where(eq(schema.user.email, email));
}

export function storeUser<User>(data: User) {}

export function updateUser<User>(data: User) {}

export function deleteUser<User>(data: User) {}

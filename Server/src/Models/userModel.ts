import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./Schema/databaseSchema";
import connection from "../../Database/connection";
import { eq, sql } from "drizzle-orm";

const db = drizzle(connection, { schema });

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  createdAt?: Date;
  modifiedAt?: Date;
};

export type UserRegister = Pick<User, "name" | "email" | "password">;

export function getAllUsers() {}

export function getUserById(id: number) {}

export function getUserByEmail(email: string) {
  return db.select().from(schema.user).where(eq(schema.user.email, email));
}

export function updateUser<User>(data: User) {}

export function storeUser(data: UserRegister) {
  return db.insert(schema.user).values(data);
}

export function deleteUser<User>(data: User) {}

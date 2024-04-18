import { db } from "../../Database/connection";
import { eq, sql } from "drizzle-orm";
import { user } from "./Schema/databaseSchema";

export function getAllUsers() {}

export function getUserById(id: number) {}

export function getUserByEmail(email: string) {
  return db.select().from(user).where(eq(user.email, email));
}

export function updateUser<User>(data: User) {}

export function storeUser(data: UserRegister) {
  return db.insert(user).values(data);
}

export function deleteUser<User>(data: User) {}

import { eq } from "drizzle-orm";
import { db } from "../../Database/connection";
import { userAddress } from "./Schema/databaseSchema";

export function getAddressByUserId(id: number) {
  return db.select().from(userAddress).where(eq(userAddress.userId, id));
}

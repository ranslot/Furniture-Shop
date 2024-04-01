import cryto from "crypto";

const SECRET = process.env.HASH_KEY as string;

export function passwordHashing(password: string): string {
  return cryto.createHmac("sha256", password).update(SECRET).digest("hex");
}

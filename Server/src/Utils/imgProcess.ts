import crypto from "crypto";
import sharp from "sharp";

export async function imgCompress(img: Buffer) {
  return await sharp(img).resize({ height: 720, width: 720, fit: "inside" }).toBuffer();
}

export function randomImageName() {
  return crypto.randomBytes(32).toString("hex");
}

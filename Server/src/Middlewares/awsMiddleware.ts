import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { imgCompress, randomImageName } from "../Utils/imgProcess";

dotenv.config();

const AWS_REGION = process.env.AWS_REGION as string;
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME as string;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY as string;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;

const s3 = new S3Client({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: AWS_REGION,
});

export async function sendImageToS3(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.files) {
    return res.json({ success: false, errors: { root: "Images not found" } });
  }

  const imgNames = [];

  try {
    for (const file of req.files as Express.Multer.File[]) {
      const buffer = await imgCompress(file.buffer);
      const imgName = randomImageName();

      const params = {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: imgName,
        Body: buffer,
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);

      imgNames.push(imgName);
    }

    res.locals.imgNames = imgNames;

    next();
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      errors: { root: "Images upload failed" },
    });
  }
}

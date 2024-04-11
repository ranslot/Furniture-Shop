import express, { Request, Response } from "express";
import { checkIsAdmin } from "../Middlewares/authMiddleware";
import { addProductValidate } from "../Middlewares/zodValidationMiddleware";
import multer from "multer";
import { sendImageToS3 } from "../Middlewares/awsMiddleware";
import { handleProductAdd } from "../Controllers/productController";

const productRouter = express.Router();
const upload = multer();

productRouter.post(
  "/add",
  upload.array("productImage[]"),
  checkIsAdmin,
  addProductValidate,
  sendImageToS3,
  handleProductAdd
);

export default productRouter;

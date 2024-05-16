import express from "express";
import { handleShowUserAddress } from "../Controllers/userAddressController";
const addressRouter = express.Router();

addressRouter.get("/:id", handleShowUserAddress);

export default addressRouter;

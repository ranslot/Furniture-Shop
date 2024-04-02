import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import homeRouter from "./Routers/homeRouter";
import authRouter from "./Routers/authRouter";

//Setup
dotenv.config();
const app: Express = express();

//Middleware
app.use(express.json()).use(cors()).use(cookieParser()).use(helmet());

//Routes
app.use("/", homeRouter).use("/auth", authRouter);

//Run
const port = process.env.PORT;
const url = process.env.URL;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://${url}:${port}`);
});

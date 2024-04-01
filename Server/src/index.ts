import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import homeRouter from "./Routers/homeRouter";
import authRouter from "./Routers/authRouter";
import { authStatus } from "./Middlewares/authMiddleware";

//Setup
dotenv.config();
const app: Express = express();

//Middleware
app.use(express.json()).use(cors());

//Routes
app.use("/", homeRouter).use("/auth", authRouter);

//Run
const port = process.env.PORT;
const url = process.env.URL;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://${url}:${port}`);
});

import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { qResult } from "./controller/test";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const url = process.env.URL;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  qResult().then((data) => {
    res.send({ msg: "Express + TypeScript Server", q: data });
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://${url}:${port}`);
});

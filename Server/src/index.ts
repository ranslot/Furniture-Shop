import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import session from "express-session";
import compression from "compression";

import { connectionString } from "../Database/connection";
import PGStore from "connect-pg-simple";
import passportInitialize from "./Utils/passport";

import homeRouter from "./Routers/homeRouter";
import authRouter from "./Routers/authRouter";
import productRouter from "./Routers/productRouter";
import addressRouter from "./Routers/addressRouter";

//Setup
dotenv.config();
const app: Express = express();

const SERVER_PORT = process.env.SERVER_PORT as string;
const CLIENT_URL = process.env.CLIENT_URL as string;
const URL = process.env.URL as string;
const AUTH_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

//Middleware
app
  .use(express.json())
  .use(cors({ credentials: true, origin: `${CLIENT_URL}` }))
  .use(cookieParser())
  .use(helmet())
  .use(express.urlencoded({ extended: true }))
  .use(compression())
  .use(
    session({
      //store sesion on pg db
      store: new (PGStore(session))({
        conString: connectionString,
        tableName: "user_sessions",
        createTableIfMissing: true,
      }),
      secret: AUTH_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, //7 days
    })
  );

passportInitialize(app);

//Routes
app
  .use("/", homeRouter)
  .use("/auth", authRouter)
  .use("/product", productRouter)
  .use("/address", addressRouter);

//Run
app.listen(SERVER_PORT, () => {
  console.log(`[server]: Server is running at http://${URL}:${SERVER_PORT}`);
});

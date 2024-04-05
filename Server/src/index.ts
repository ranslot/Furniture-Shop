import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import homeRouter from "./Routers/homeRouter";
import authRouter from "./Routers/authRouter";
import session from "express-session";
import passportInitialize from "./helpers/passport";

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
  .use(
    session({
      secret: AUTH_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
passportInitialize(app);

//Routes
app.use("/", homeRouter).use("/auth", authRouter);

//Run
app.listen(SERVER_PORT, () => {
  console.log(`[server]: Server is running at http://${URL}:${SERVER_PORT}`);
});

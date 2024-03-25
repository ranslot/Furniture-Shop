import express, { Request, Response } from "express";
import DatabaseError from "../Errors/DatabaseError";
import { qValidation } from "../Controllers/testController";

const homeRouter = express.Router();

homeRouter.get("/", async (request: Request, response: Response) => {
  try {
    const data = await qValidation();
    response.send({ msg: "Express + TypeScript Server", q: data });
  } catch (error) {
    if (error instanceof DatabaseError) {
      response.status(500).send({ msg: "Database error" });
    } else {
      response.status(500).send({ msg: "Internal server error" });
    }
  }
});

export default homeRouter;

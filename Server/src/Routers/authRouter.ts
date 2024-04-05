import express, { NextFunction, Request, Response } from "express";
import { userRegister } from "../Controllers/userController";
import {
  checkAuthenticate,
  checkNotAuthenticated,
  loginValidate,
  registerValidate,
} from "../Middlewares/authMiddleware";
import passport from "passport";

const authRouter = express.Router();

type Info = {
  message?: string;
};

authRouter
  //Login
  .post("/login", checkNotAuthenticated, loginValidate, function (request: Request, response: Response) {
    //passport custom response to have request and response
    passport.authenticate("local", function (err: any, user: Express.User, info: Info) {
      //No mail
      if (!user && info.message === "email") {
        return response.json({
          success: false,
          errors: {
            email: "No user with that email",
          },
        });
      }
      //No pass
      else if (!user && info.message === "password") {
        return response.json({
          success: false,
          errors: {
            password: "Password incorrect",
          },
        });
      }
      //Database error
      else if (err) {
        return response.json({
          success: false,
          errors: {
            root: "Log in failed. Please try again.",
          },
        });
      }
      //When make passport custom response it need to call logIn manually
      else {
        request.logIn(user, function (err) {
          //Connection fail
          if (err) {
            return response.json({
              success: false,
              errors: {
                root: "Log in failed. Please try again.",
              },
            });
          }
          //Success
          return response.json({
            success: true,
            user: user,
          });
        });
      }
    })(request, response); //Immediate function call
  })
  .post("/logout", checkAuthenticate, async (request: Request, response: Response) => {
    request.logOut({ keepSessionInfo: false }, function (err) {
      //Connection fail
      if (err) {
        return response.json({
          success: false,
          errors: {
            root: "Log out failed. Please try again.",
          },
        });
      }
      //Success
      return response.json({
        success: true,
      });
    });
  })
  .post(
    "/register",
    checkNotAuthenticated,
    registerValidate,
    async (request: Request, response: Response) => {
      userRegister(request, response);
    }
  );

export default authRouter;

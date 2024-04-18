import passport from "passport";
import { Strategy } from "passport-local";
import { Express, Request, Response } from "express";
import { getUserByEmail } from "../Models/userModel";
import { compareSync } from "bcrypt";

export default function passportInitialize(app: Express) {
  app.use(passport.initialize());
  app.use(passport.authenticate("session"));
  passport.use(
    new Strategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await getUserByEmail(email);
        if (user.length === 0) {
          return done(null, false, { message: "email" });
        }
        const passwordMatches = compareSync(password, user[0].password);
        if (!passwordMatches) {
          return done(null, false, { message: "password" });
        }
        return done(null, user[0]);
      } catch (error) {
        //If fail to call database or bcypt being wierd.
        return done(error);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (user: User, done) => {
    const u = await getUserByEmail(user.email);
    done(null, u[0]);
  });
}

export function handlePassportAuthentication(req: Request, res: Response) {
  passport.authenticate(
    "local",
    (err: Error | null, user: Express.User, info: any) => {
      if (!user && info.message === "email") {
        return res.json({
          success: false,
          errors: { email: "No user with that email" },
        });
      } else if (!user && info.message === "password") {
        return res.json({
          success: false,
          errors: { password: "Password incorrect" },
        });
      } else if (err) {
        return res.json({
          success: false,
          errors: { root: "Log in failed. Please try again." },
        });
      } else {
        req.logIn(user, (err) => {
          if (err) {
            return res.json({
              success: false,
              errors: { root: "Log in failed. Please try again." },
            });
          }
          return res.json({ success: true, user });
        });
      }
    }
  )(req, res); //immediate invoke function to send req, res to authenticate
}

export function handlePassportLogout(req: Request, res: Response) {
  if (!res.locals.perm) {
    return res.json({
      success: false,
      errors: { root: "You don't have permission." },
    });
  }
  req.logOut({ keepSessionInfo: false }, (err: Error | null) => {
    if (err) {
      return res.json({
        success: false,
        errors: { root: "Log out failed. Please try again." },
      });
    }
    return res.json({ success: true });
  });
}

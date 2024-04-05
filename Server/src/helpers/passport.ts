import passport from "passport";
import { Strategy } from "passport-local";
import { Express } from "express";
import { User, getUserByEmail } from "../Models/userModel";
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

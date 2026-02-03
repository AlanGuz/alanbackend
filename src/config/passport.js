import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config({ path: "src/.env" });

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

passport.use("login", new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) return done(null, false);

      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) return done(null, false);

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.use("jwt", new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromExtractors([
    (req) => req.cookies.token
  ]),
  secretOrKey: process.env.JWT_SECRET
}, async (jwt_payload, done) => {
  try {
    const user = await UserModel.findById(jwt_payload.user._id);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));


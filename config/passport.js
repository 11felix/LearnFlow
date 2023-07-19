import 'dotenv/config';
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshTocken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.lastName,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
      };

      try {
        let user = await User.findOne({
          googleId: profile.id,
        });
        if (user) {
          console.log("user already exist", newUser.email);
          done(null, user);
        } else {
          user = await User.create(newUser);
          console.log("new user created", newUser.email);
          done(null, user);
        }
      } catch (err) {
        done(err, null);
        console.log(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
const { Strategy } = require("passport-google-oauth2");
const passport = require("passport");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL, PORT } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}:${PORT}/api/users/google/callback`,
  passReqCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, displayName, picture, locate } = profile;

    console.log(email);

    const user = await User.findOne({ email });
    if (user) {
      done(null, user);
    }

    console.log(user);

    const password = nanoid();
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      name: displayName,
      password: hashPassword,
      avatarURL: picture,
      city: locate || "kyiv, Ukraine",
      phone: "+3800000000000",
    });

    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

module.exports = passport;

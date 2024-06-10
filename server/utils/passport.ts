import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';

dotenv.config();
 
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ['profile', 'email'],
    },
    (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      done(null, profile);
    }
  )
); 

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Exporting the configured passport
export default passport;

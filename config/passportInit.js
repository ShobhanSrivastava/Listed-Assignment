import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, PORT } from './envConfig.js';
import { User } from '../models/index.js';
import logger from '../loggers/logger.js';
import { accessTokenRenew, checkExpired } from '../utils/tokenManager.js';

function passportInit(passport) {
    // Passport configuration using Google Strategy
    passport.use(
        new GoogleStrategy(
            {
                // Strategy Options
                clientID: OAUTH_CLIENT_ID,
                clientSecret: OAUTH_CLIENT_SECRET,
                callbackURL: `http://localhost:${PORT}/auth/google/callback`,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                  // Try to find the user in the DB
                  const user = await User.findOne({ userId: profile.id });

                  // Calculate expiration time
                  const expirationDuration = 3600; // 1 hour in seconds
                  const expirationTime = Date.now() + expirationDuration * 1000;

                  // If user is not present
                  if(!user) {
                    const newUser = new User({
                      userId: profile.id,
                      accessToken,
                      refreshToken,
                      expirationTime,
                    });
  
                    try {
                      // Save the new user in the database
                      const createdUser = await newUser.save();
  
                      return done(null, createdUser);
                    } catch (error) {
                      logger.error('Error saving new user:', error);
                      return done(error);
                    }
                  }

                  // The user is present but the access token has expired
                  if (checkExpired(user.expirationTime)) {
                    logger.info('Expired Access Token / About to expire');
                    // Get the new access token
                    const newToken = await accessTokenRenew(user.refreshToken);
                    user.expirationTime = expirationTime;
                    // Update the user data in DB with new access token and expiration time
                    try {
                      const updatedUser = await User.findOneAndUpdate(
                        { userId: user.userId },
                        { $set: { accessToken: newToken, expirationTime: expirationTime }},
                        { new: true }
                      )
                      return done(null, updatedUser);
                    }
                    catch(error) {
                      logger.error(error);
                      return done(error);
                    }
                  }

                  // If user is present and has a valid expiration time
                  return done(null, user);
                } catch (error) {
                  logger.error('Error finding user:', error);
                  return done(error);
                }
            }
        )
    );

    // Serialize user
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    // Deserialize user
    passport.deserializeUser(async function (user, done) {
        try {
            // Find the user in the database using the user's ID
            const foundUser = await User.findOne({ userId: user.userId });
            return done(null, foundUser);
        } catch (error) {
            logger.error('Error deserializing user:', error);
            done(null, false);
        }
    });
}

export default passportInit;

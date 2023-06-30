import logger from '../loggers/logger.js';
import { randomBetween } from './utility.js';
import autoReply from './gmailManager.js';
import User from '../models/user.js';
import { checkExpired, accessTokenRenew } from './tokenManager.js';

const runningJobs = {};

// Starts a job for the given user
function startJob(user) {
    const userId = user.userId;
    if(runningJobs[userId]) {
        logger.info(`Job for ${userId} is already running`);
        return;
    }

    let randomTime = 0;
    runningJobs[userId] = setTimeout(async function run() {
        // The user is present but the access token has expired or is about to expire
        if (checkExpired(user.expirationTime)) {
            logger.info('Expired Access Token / About to expire');
            // Get the new access token
            const newToken = await accessTokenRenew(user.refreshToken);
            user.accessToken = newToken;
            // Update the user data in DB with new access token and expiration time

            // Calculate expiration time
            const expirationDuration = 3600; // 1 hour in seconds
            const expirationTime = Date.now() + expirationDuration * 1000;

            user.expirationTime = expirationTime;

            try {
              await User.findOneAndUpdate(
                { userId: user.userId },
                { $set: { accessToken: newToken, expirationTime: expirationTime }}
              )
            }
            catch(error) {
                logger.error(error);
            }
        }

        await autoReply(user);

        randomTime = randomBetween(45, 120);
        stopJob(userId);
        runningJobs[userId] = setTimeout(run, randomTime);
    }, randomTime);
}

// Stops the job for the given user
function stopJob(user) {
    const userId = user.userId;
    if(!runningJobs[userId]) {
        logger.info(`Job for ${userId} doesnt exist`);
    }
    clear(userId);
}

// Clears the timeout for the given userId
function clear(userId) {
    clearTimeout(runningJobs[userId]);
    delete runningJobs[userId];
}

export { startJob, stopJob };

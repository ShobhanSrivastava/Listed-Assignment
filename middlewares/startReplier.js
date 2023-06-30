import logger from "../loggers/logger.js";
import { startJob } from "../utils/jobManager.js";

// Middleware to start the autoreply job for the user
function startReplier(req, res, next) {
  const user = req.user;
  try {
    startJob(user); // Start the autoreply job asynchronously in the background
    return next(); // Continue to the next middleware or controller
  } catch (error) {
    logger.error(error);
    return res.send('Some error occurred');
  }
}

export default startReplier;
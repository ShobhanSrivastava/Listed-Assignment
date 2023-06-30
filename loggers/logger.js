// Import the appropriate logger based on the environment
import devLogger from "./dev.js";
import prodLogger from "./prod.js";
import { NODE_ENV } from '../config/envConfig.js';

let logger;

// Determine the logger based on the environment
if (NODE_ENV !== 'production') {
  logger = devLogger();
} else {
  logger = prodLogger();
}

export default logger;
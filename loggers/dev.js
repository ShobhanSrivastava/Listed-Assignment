// Import the required modules from the 'winston' library
import winston, { format, transports } from 'winston';

// Destructure the format module for easier usage
const { combine, printf, timestamp, colorize } = format;

// Define a custom log format using printf
const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level}] ${message}`;
});

// Create a logger configuration for development environment
function devLogger() {
  return winston.createLogger({
    level: 'debug',
    // Use the combine function to apply multiple formatting options
    format: combine(colorize(), timestamp({ format: 'HH:mm:ss' }), customFormat),
    transports: [new transports.Console()]
  });
}

export default devLogger;

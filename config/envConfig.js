// Import the 'dotenv' package for loading environment variables from a .env file
import dotenv from 'dotenv';
// Load environment variables from the .env file
dotenv.config();

// Export the required environment variables
export const {
    PORT,            // The port number
    NODE_ENV,        // The current environment ('development', 'production', etc.)
    OAUTH_CLIENT_ID, // The OAuth client ID
    OAUTH_CLIENT_SECRET, // The OAuth client secret
    SESSION_SECRET,  // The secret key for session management
    DB_CONN_STRING   // The connection string for the database
} = process.env;

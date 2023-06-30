import mongoose from 'mongoose';

import { DB_CONN_STRING } from './envConfig.js';
import logger from '../loggers/logger.js';

// Connects to the MongoDB database
function connect() {
    // Use the MongoDB connection string to establish a connection
    mongoose.connect(DB_CONN_STRING);

    const connection = mongoose.connection;

    // Handle the 'error' event if there's an error connecting to the database
    connection.on('error', () => logger.error('Error Connecting to DB'));

    // Handle the 'open' event once the connection is successfully established
    connection.once('open', () => logger.info('Successfully Connected to DB'));

    // Return the connection object
    return connection;
}

export default connect;

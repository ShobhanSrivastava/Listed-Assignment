// Package imports
import express from 'express'; 
import passport from 'passport';
import session from 'express-session';

// File imports
import { PORT, SESSION_SECRET } from './config/envConfig.js';
import logger from './loggers/logger.js';
import { authRouter } from './routes/index.js';
import passportInit from './config/passportInit.js';
import connect from './config/dbConfig.js'

// Create server
const app = express();
// Parse json data in request
app.use(express.json());

// Connect to DB 
connect();

// Configure session middleware
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Initialise the passport middleware
app.use(passport.initialize());
// Enable passport sessions to manage sessions during authentication
app.use(passport.session());

// Configure passport with the Google OAuth2.0 strategy in the function
// This function also covers the serialisation and deserialisation of the user
passportInit(passport);

// API endpoints
app.use('/auth', authRouter); // Separate route handler for routes starting with /auth

// Homepage handling
app.get('/', (req, res) => {
    res.redirect('http://www.google.com');
});

// Unavailable path handling
app.use('/', (req, res) => {
    res.send(`It seems you're lost - 404`);
})

// Listen to incoming requests
app.listen(PORT, () => {
    logger.info(`Server running on PORT ${PORT}`);
});




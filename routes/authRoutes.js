import express from 'express';
import passport from 'passport';

import { userLoggedIn } from '../middlewares/auth.js'
import startReplier from '../middlewares/startReplier.js';

const router = express.Router();

// Route to initiate Google authentication
router.get('/google', passport.authenticate('google', {
    scope: [
      'profile',
      'email',
      'https://www.googleapis.com/auth/gmail.labels',
      'https://www.googleapis.com/auth/gmail.modify'
    ],
    accessType: 'offline'
}));
  
// Callback route after successful authentication
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/login' }),
    (req, res) => {
        // Redirect the user after successful authentication
        res.redirect('/auth/success');
    }
);

// Route to display login link
router.get('/login', (req, res) => {
    res.send(`<a href='/auth/google'>Login with Google</a>`);
})

// Route to logout the user
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
})

// Route to display success message and activate autoreply
// Uses middlewares like userLoggedIn to make the route protected
// The startReplier starts the replier before sending the response
router.get('/success', userLoggedIn, startReplier, (req, res) => {
    res.send('<h1>The autoreply for your Gmail account has been activated!</h1>')
})

export default router;
  
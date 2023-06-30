// This middleware checks if the user is authenticated
// If not, the user is redirected to login page
// Otherwise request is passed to the next middleware
// This is used in protecting the routes

function userLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();

    return res.redirect('/auth/login');
}

export { userLoggedIn };
/**
 *
 * @module loginHelper
 * @description A helper to handle common login tasks
 */

/**
 *
 * @param req The request object
 * @param res Response
 * @param next Callback if the user is logged in.
 */

exports.requiresLogin = function(req, res, next) {
    if(req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};
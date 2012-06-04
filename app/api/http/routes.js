/**
 *
 * @namespace api
 * @description the external facing services/api provided by this application.
 */
/**
 *
 * @namespace api.http
 * @description api for http protocol
 */
/**
 * @module routes
 * @description defines all the routes for the application.
 *
 * @requires loginHelper
 */

var loginHelper = require('../helpers/loginHelper');


/**
 *
 * @param app express application that the routes are to be defined for.
 * @param controllers object to get the controllers from.
 */
exports.setupRoutes = function (app, controllers) {
    'use strict';
    //TODO: move the dependency on loginHelper from the controllers to the api
    //TODO: define custom tags to show the api stuff
    // GET Home

    app.get('/', loginHelper.requiresLogin, controllers.get('home').index);

    // GET signup
    app.get('/signup', controllers.get('user').signup);

    // GET login
    app.get('/login', controllers.get('user').login);

    // POST login
    app.post('/login', controllers.get('user').authenticate);

    // GET logout
    app.get('/logout', loginHelper.requiresLogin, controllers.get('user').logout);

};


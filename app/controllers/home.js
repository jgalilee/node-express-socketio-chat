/**
 *
 * @namespace controller
 *
 * @description controllers base definition is here or something
 *
 */
/**
 * @module home
 * @description welcome page controller
 */


var Controller = require('../controller');
var loginHelper = require('./helpers/loginHelper');

exports.controller = Controller.define('Home', function() {


    this.urlSuffix.set('');
    // /
    this.get.define('/', loginHelper.requiresLogin, function(req, res) {
        'use strict';
        res.render('home/index', {
            value: req.session.value,
            title: 'Welcome'
        });
    });

});

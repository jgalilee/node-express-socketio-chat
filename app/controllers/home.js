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


exports.controller = Controller.define('Home', function() {

    // /
    route.get.define('', loginHelper.requiresLogin, function(req, res) {
        'use strict';
        res.render('home/index', {
            value: req.session.value,
            title: 'Welcome'
        });
    });

});
// exports.controller = Controller.define('Home', {
//  // /
//  actions: {
//      get: [{
//          url: '',
//          middleware: loginHelper.requiresLogin,
//          handler: function(req, res) {
//              'use strict';
//              res.render('home/index', {
//                  value: req.session.value,
//                  title: 'Welcome'
//              });
//          }]
//      }
//  }
// }

var Controller = require('../controller');


var users = require('../model/users');


exports.controller = Controller.define('Users', function() {

    // /users/login
    this.get.define('/login', function(req, res) {
        res.render('login', {
            title: 'Login'
        });
    });

    // /users/login
    this.post.define('/login', function(req, res) {

        // Get the username and password.
        var username = req.body.login
            , password = req.body.password;
        // Authenticate the username and password.
        users.authenticate(username, password, function(user) {
            if(user) {
                req.session.user = user;
                res.redirect('/');
            } else {
                res.render('login', {
                    title: 'Login failed'
                });
            }
        });
    });

    // /users/logout
    this.get.define('/logout', function(req, res) {
        console.log(req.session.id);
        delete req.session.user;
        res.render('logout', {
            title: 'Logged out'
        })
    });

});
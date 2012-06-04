// Dependencies
var express = require('express')
    , routes = require('./app/api/http/routes')
    , io = require('socket.io')
    , app = module.exports = express.createServer()
    , controllers = require('./app/controllers/controllers')
    , util = require('util')
    , sessionStore = new express.session.MemoryStore()
    , parseCookie = require('connect').utils.parseCookie;

// Configuration
app.configure(function () {
    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'jade');

    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.cookieParser());

    app.use(express.session({
        secret: 'secret',
        key: 'express.sid',
        store: sessionStore
    }));

    app.use(require('stylus').middleware({ src:__dirname + '/public' }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

// Environment (Development)
app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
});

// Environment (Production)
app.configure('production', function () {
    app.use(express.errorHandler());
});

/*
 * WEB SERVER
 */

// Helpers
app.dynamicHelpers({
    user: function (req, res) {
        if (req.session && req.session.user) {
            return {
                name: req.session.user.login,
                guest: false
            };
        } else {
            return {
                name: 'Guest',
                guest: true
            };
        }
    },
    flash: function (req, res) {
        return req.flash();
    }
});

//Setup routes

routes.setupRoutes(app, controllers);

// Execute
var sio = io.listen(app);
sio.set('authorization', function (data, accept) {

    console.log('checking authentication');
    console.log(data.headers);

    if (!data.headers.cookie) {
        return accept('No cookie transmitted.', false);
    }

    data.cookie = parseCookie(data.headers.cookie);
    data.sessionID = data.cookie['express.sid'];

    sessionStore.load(data.sessionID, function (err, session) {

        // Check if there was an error or if the server couldn't load.
        if (err || !session || !session.user) {
            return accept('Error', false);

            // Otherwise allow the server to let the user in.
        } else {
            data.session = session;
            return accept(null, true);
        }
    });

});

/*
 *  MESSAGE PROGRAM
 */

var users = {};
var rooms = ['room1', 'room2', 'room3'];

sio.sockets.on('connection', function (socket) {

    var sess = socket.handshake.session;
    socket.log.info('a socket with sessionID', socket.handshake.sessionID, 'connected');
    var keepAlive = function () {
        sess.reload(function () {
            sess.touch().save();
        });
    };

    // store the username in the socket session for this client
    var username = users[sess.user.login] = sess.user.login;

    socket.username = username;
    socket.room = 'room1';
    socket.join('room1');
    socket.emit('updatechat', 'SERVER', 'Welcome ' + socket.username + ' you have connected to room1!');
    socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
    socket.emit('updaterooms', rooms, 'room1');

    /*
     *  USER SENDS A MESSAGE
     */
    socket.on('sendchat', function (data) {
        if(data === "whois"){
            data = "The following users are connected ... ";
            for (var username in users) {
                
                data += "<br/> " + username;
            };


        }
        sio.sockets.in(socket.room).emit('updatechat', socket.username, data);
        keepAlive();
    });



    /*
     *  USER CHANGES ROOM
     */
    socket.on('switchRoom', function (newroom) {

        // leave the current room (stored in session)
        socket.leave(socket.room);

        // join new room, received as function parameter
        socket.join(newroom);
        socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom);

        // sent message to OLD room
        socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has left this room');

        // update socket session room title
        socket.room = newroom;
        socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
        socket.emit('updaterooms', rooms, newroom);

        keepAlive();
    });

    /*
     *  USER DISCONNECTS
     */
    socket.on('disconnect', function () {

        // remove the username from global users list
        delete users[socket.username];

        // update list of users in chat, client-side
        sio.sockets.emit('updateusers', users);

        // echo globally that this client has left
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
        socket.leave(socket.room);

        keepAlive();
    });

});

/*
 *  USER ERROR
 */
sio.sockets.on('error', function (reason) {
    console.error('Unable to connect Socket.IO', reason);
});

// SERVER
app.listen(3000, function () {
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

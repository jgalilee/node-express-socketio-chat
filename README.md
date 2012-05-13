# node-express-socketio-chat

In progress example application of an authenticated socket.io chat program. Users must login to connect to the chat program.

## TODO

### Infastructure

 1. Add SQL database connection.
 2. Add ORM for persiting user model.
 3. Improve session storage by moving from connectjs memory store to redis memory store.

### Functionality
 
 1. Add room model.
 2. Fix room persistence.
 3. Add sound effects.

## Installation

 1. Install node.js v0.6.17
 2. Install npm
 3. Run npm install -d

## Run

### node
````
  $ node app.js
````

### nodemon
````
  $ npm install -g nodemon
  $ nodemon app.js
````

## Using

 + expressjs
 + expressjs sessions
 + jade template engine
 + stylus stylesheet engine
"use strict";

let Server = require('./server/server');
const config = require('./config.json');

var server = new Server();
server.start(config).then(result => {
  console.log('Server started successfully.');
}).catch(err => {
  console.error(err);
});

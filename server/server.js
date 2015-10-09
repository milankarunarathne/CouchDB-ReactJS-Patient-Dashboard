"use strict";

var http = require('http');
var url = require('url');
var crypto = require('crypto');
var nano = require('nano');
var debug = require('debug')('server:server');

module.exports = class Server {
  constructor() {
    this.server = null;
    this.couchdb = null;
    this.headers = {
      'Content-Type': 'application/json'
    };
  }

  generateId() {
    return crypto.randomBytes(32).toString('hex');
  }

  requestHandler() {
    return (req, res) => {
      debug('New request > ', req.url);
      let chunk = '';
      req.on('data', (data) => {
        chunk += data;
      });
      req.on('end', () => {
        const reqURL = url.parse(req.url, true);
        switch (reqURL.pathname.split('/')[1]) {
          case 'patients':
            debug('/patients');
            switch (req.method) {
              case 'POST':
                try {
                  var data = JSON.parse(chunk.toString());
                } catch (e) {
                  _sendResponse(417, this.headers, {
                    error: "Invalid JSON data."
                  });
                  return;
                }
                this.couchdb.insert(data, {
                  _id: this.generateId(),
                  resourceType: 'patients'
                }, (err, result) => {
                  debug('Inserted: ', err, result);
                  if (err) {
                    console.error(err);
                    _sendResponse(500, this.headers, {
                      error: "Unable to insert documentation."
                    });
                    return;
                  }
                  _sendResponse(200, this.headers, result);
                });

                break;
              case 'GET':
                const _id = reqURL.pathname.split('/')[2];
                this.couchdb.get(_id, (err, result) => {
                  if (err) {
                    console.error(err);
                    _sendResponse(500, this.headers, {
                      error: "Unable read documentation."
                    });
                    return;
                  }
                  _sendResponse(200, this.headers, result);
                });
                break;
              case 'PUT':

                break;
              case 'DELETE':

                break;
              default:
                debug('Default');
                _sendResponse(404, this.headers, {
                  error: "Requested method doesn't exists"
                });
            }
            break;
          default:
            debug('Default');
            _sendResponse(404, this.headers, {
              error: "Requested endpoint doesn't exists"
            });
            break;
        }
      });

      var _sendResponse = (statusCode, headers, response) => {
        res.writeHead(statusCode, headers);
        res.end(JSON.stringify(response));
      }
    };
  };

  start(opts) {
    return new Promise((resolve, reject) => {
      let createServer = () => {
        this.couchdb = database.use(opts.databaseName);

        this.server = http.createServer(this.requestHandler());
        this.server.listen(8000, 'localhost', err => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve();
          }
        }); // END - Start Server
      };

      // Connect to CouchDB and make a database
      let database = nano(
        `http://${opts.couchDBHostAddress}:${opts.couchDBHostPort}`);
      // List existing databases and check whether given database exists
      database.db.list((err, databases) => {
        if (databases.indexOf(opts.databaseName) > -1) {
          debug('List databses ', databases);
          createServer();
        } else {
          database.db.create(opts.databaseName, (err) => {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }
            createServer();
          }); // END - Create Database
        }
      }); // END - List Databsaes
    });
  }

  stop() {
    return new Promise((resolve, reject) => {
      this.server.stop(err => {
        if (err) reject(err);
        else resolve();
      })
    });
  }
}

'use strict'

const config = require('./config/config'),
  restify = require('restify'),
  mongoose = require('mongoose');

// Initialize server
const server = restify.createServer({name: config.name, version: config.version});

// Bundle plugins
server.use(restify.plugins.jsonBodyParser({mapParams: true}));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({mapParams: true}));
server.use(restify.plugins.fullResponse());

server.listen(config.port, () => {
  // establish connection to mongodb atlas
  const opts = {
    useMongoClient: true,
    promiseLibrary: global.Promise,
    server: {
      auto_reconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    },
    config: {
      autoIndex: true
    }
  };

  mongoose.Promise = opts.promiseLibrary;
  mongoose.connect(config.db.uri, opts);

  const db = mongoose.connection;

  db.on('error', (error) => {
    if (error.message.code === 'ETIMEDOUT') {
      console.error(error);
      mongoose.connect(config.db.uri, opts);
    }
  });

  db.once('open', () => {
    require('./routes/user')(server)
    require('./routes/todo')(server)

    console.log(`Server is listening on port ${config.port}`)
  })
});

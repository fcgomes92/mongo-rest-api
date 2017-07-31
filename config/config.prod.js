'use strict'

module.exports = {
  name: 'mongo-rest-api',
  version: '1.0.0',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  db: {
    // GET THIS FROM NODE_ENV
    uri: '<PRODUCTION_DATABASE_URI>'
  }
}

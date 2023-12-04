/**
 * Title: app.js
 * Author: Professor Krasso
 * Date: 8/5/2023
 */
'use strict'

// Require statements
const express = require('express')
const createServer = require('http-errors')
const path = require('path')
const morgan = require('morgan');
const cors = require('cors')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Create the Express app
const app = express()
app.use(cors())

app.use(morgan('dev'));

const userRoutes = require('./routes/user-routes')
const securityRoutes = require('./routes/security-route')
const invoiceRoutes = require('./routes/invoice-route')

const options = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'BCRS API',
          version: '1.0.0'
      },
  },
  apis: ['server/routes/*.js']
}

const openapiSpecification = swaggerJsdoc(options);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });

  // Configure the app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist/bcrs')))
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', userRoutes)
app.use('/api', securityRoutes)
app.use('/api', invoiceRoutes)

// error handler for 404 errors
app.use(function(req, res, next) {
  next(createServer(404)) // forward to error handler
})

// error handler for all other errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500) // set response status code

  // send response to client in JSON format with a message and stack trace
  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  })
})

module.exports = app // export the Express application
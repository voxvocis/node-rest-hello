/**
 * Entry file for the API
 * Heavely based on the RESTful API from The Node.js Master Class
 */

// Dependencies
const http = require('http')
const app = require('./app')

const config = {
  port: 8080
}

// Instantiating the HTTP server
const server = http.createServer((req, res) => {
  app(req, res)
})

// Start the HTTP server
server.listen(config.port, () => {
  console.log('The HTTP server is listening on port:', config.port)
})

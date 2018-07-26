/**
 * The server logic for the HTTP server
 * Heavely based on The Node.js Master Class
 */

// Dependencies
const url = require('url')
const fs = require('fs')
const StringDecoder = require('string_decoder').StringDecoder

module.exports = (req, res) => {
  // Get the URL and parse it
  const parsedUrlObject = url.parse(req.url, true)

  // Get the path
  const untrimmedPath = parsedUrlObject.pathname
  const trimmedPath = untrimmedPath.replace(/^\/+|\/+$/g, '')

  // Get the query string as an Object
  const queryStringObject = parsedUrlObject.query

  // Get the HTTP Method
  const method = req.method.toLowerCase()

  // Get the HTTP headers
  const headers = req.headers

  // Get the payload, if any
  const decoder = new StringDecoder('utf-8')
  let buffer = ''

  req.on('data', data => {
    buffer += decoder.write(data)
  })

  req.on('end', () => {
    buffer += decoder.end()

    // Choose a handler
    const handler =
      typeof router[trimmedPath] !== 'undefined' ? router[trimmedPath] : handlers.notFound

    // Construct the data object to send to the handler
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer
    }

    // Route the request to the chosen handler
    handler(data, (statusCode = 200, payload = undefined) => {
      // convert the payload string
      const payloadString = JSON.stringify(payload)

      // return the response
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(statusCode)
      res.end(payloadString)

      // Log the requst path
      console.log('Returnning this response:', statusCode, ' & ', payloadString)
    })
  })
}

// Request handlers
const handlers = {}

// Sample handler
handlers.hello = (data, callback) => {
  // Callback a HTTP status and a payload object
  callback(200, { message: 'Hello there API consumer!' })
}

// Not found handler
handlers.notFound = (data, callback) => {
  callback(404)
}

// Request router
const router = {
  hello: handlers.hello
}

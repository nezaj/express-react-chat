/* eslint no-console: 0 */
/* Entry-point for our express server */

const program = require('commander')
const express = require('express')
const http = require('http')
const socket = require('socket.io')

function main() {
  // Initialize app
  const app = express()
  const server = http.createServer(app)
  const io = socket(server)
  let handles = new Map()

  // Enable cors
  io.set('origins', '*:*')

  io.on('connection', client => {
    console.log('new connection by', client.id)

    /* Listeners */

    // Handle registeration
    client.on('register', data => {
      // Broadcast updated handle lists to all clients
      handles.set(client.id, data.handle)
      io.sockets.emit('new_user', {
        handles: Array.from(handles.values()),
      })

      // Broadcast join message to all clients
      io.sockets.emit('new_message', {
        content: `${data.handle} joined the chat`,
      })
    })

    // Handle disconnections
    client.on('disconnect', () => {
      const handle = handles.get(client.id)
      handles.delete(client.id)

      io.sockets.emit('new_message', {
        type: 'chat',
        content: `${handle} left the chat`,
      })

      // Update userlist to clients
      io.sockets.emit('update_handles', {
        handles: Array.from(handles.values()),
      })

      console.log(client.id, 'disconnected')
    })

    // Handle new messages
    client.on('new_message', data => {
      io.sockets.emit('new_message', {
        type: 'chat',
        content: `${data.handle}: ${data.message}`,
      })
    })

    // Handle name changes
    client.on('update_handle', data => {
      const { oldHandle, newHandle } = data
      handles.set(client.id, newHandle)

      // Update client handle
      client.emit('update_handle', {
        handle: newHandle,
      })

      // Broadcast user updated handle
      io.sockets.emit('new_message', {
        type: 'chat',
        content: `${oldHandle} changed handle to ${newHandle}`,
      })

      // Broadcast new user list to all clients
      io.sockets.emit('update_handles', {
        handles: Array.from(handles.values()),
      })
    })
  })

  const port = process.env.PORT || 8000
  server.listen(port)
}

if (require.main === module) {
  program
    .description('Info: Start the backend webserver')
    .usage(': node server.py [options]')
    .parse(process.argv)

  main(program)
}

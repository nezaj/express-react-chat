/* eslint no-console: 0 */
import React, { Component } from 'react'
import openSocket from 'socket.io-client'

import './App.css'

const socket = process.env.REACT_APP_HOST
  ? openSocket()
  : openSocket('http://localhost:8000')

function generateHandle() {
  return Math.random()
    .toString(36)
    .substr(2, 9)
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      handle: generateHandle(),
      handles: [],
      messages: [],
    }
  }

  componentDidMount() {
    const { handle } = this.state

    socket.on('register', data => {
      this.updateHandle(data)
    })

    socket.on('new_message', data => {
      this.updateMessages(data)
    })

    socket.on('new_user', data => {
      this.updateUsers(data)
    })

    socket.on('update_handle', data => {
      this.updateHandle(data)
    })

    socket.on('update_handles', data => {
      this.updateUsers(data)
    })

    socket.emit('register', { handle })
  }

  /* UI Handlers */
  updateHandle = data => {
    this.setState({ handle: data.handle })
  }

  updateMessages = data => {
    const { messages } = this.state
    this.setState({ messages: messages.concat(data) })
  }

  updateUsers = data => {
    const { handles } = data
    this.setState({ handles })
  }

  /* Actions */
  onUpdateHandle = handle => {
    const oldHandle = this.state.handle
    socket.emit('update_handle', { oldHandle, newHandle: handle })
  }

  onSendMessage = message => {
    const { handle } = this.state
    socket.emit('new_message', { message, handle: handle })
  }

  render() {
    const { messages, handle, handles } = this.state
    return (
      <div className="app-container">
        <NameChangeForm handle={handle} updateHandle={this.onUpdateHandle} />
        <Title title={'React Chat!'} />
        <div className="main">
          <Messages messages={messages} />
          <UserList handles={handles} />
        </div>
        <SendForm onSend={this.onSendMessage} />
      </div>
    )
  }
}

class NameChangeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      handle: props.handle || '',
    }
  }

  onChange = e => {
    const handle = e.target.value
    this.setState({ handle })
  }

  onSubmit = e => {
    e.preventDefault()
    const { handle } = this.state
    const { updateHandle } = this.props
    handle && handle !== this.props.handle && updateHandle(handle)
  }

  render() {
    const { handle } = this.state
    return (
      <div className="name-change-form">
        <input
          type="text"
          className="name-change-input"
          onChange={this.onChange}
          value={handle}
        />
        <button className="name-change-button" onClick={this.onSubmit}>
          Change Handle
        </button>
      </div>
    )
  }
}

const Title = ({ title }) => <div className="title">{title}</div>

const Messages = ({ messages }) => (
  <div className="message-list">
    {messages.map((message, idx) => (
      <div key={idx} className="message">
        {message.content}
      </div>
    ))}
  </div>
)

const UserList = ({ handles }) => (
  <div className="users-list">
    <h4 className="users-header">Users</h4>
    <div className="users">
      {handles.map((handle, idx) => (
        <div key={idx} className="user">
          {'>'} {handle}
        </div>
      ))}
    </div>
  </div>
)

class SendForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
    }
  }

  onChange = e => {
    const message = e.target.value
    this.setState({ message })
  }

  send = e => {
    e.preventDefault()
    const { onSend } = this.props
    const { message } = this.state
    message && onSend(message)
    this.setState({ message: '' })
  }

  render() {
    const { message } = this.state
    return (
      <div className="send-form">
        <textarea
          rows="3"
          className="send-input"
          placeholder="Type something in..."
          onChange={this.onChange}
          value={message}
        />
        <button className="send-button" onClick={this.send}>
          Send
        </button>
      </div>
    )
  }
}

export default App

/* Entry point for our create-react-app (webpack) server */

import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './client/components/App'

// Used for heroku
require('dotenv').config()

ReactDOM.render(<App />, document.getElementById('root'))

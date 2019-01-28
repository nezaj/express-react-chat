const React = require('react')
const ReactDOM = require('react-dom')
const { App } = require('../components')

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

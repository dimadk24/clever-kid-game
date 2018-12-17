import 'react-hot-loader/patch'
import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from './App'

const rootElement = document.getElementById('root')

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    rootElement)
}

render(App)

if (module.hot) {
  module.hot.accept('./App.js', () => render(App))
}

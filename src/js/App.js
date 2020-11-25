import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import store, { history } from './store'
import Router from './Router'

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className='app'>
          <Router />
        </div>
      </ConnectedRouter>
    </Provider>
  )
}

export default App

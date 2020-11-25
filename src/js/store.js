import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'

import createRootReducer from './reducers'

export const history = createBrowserHistory()

const middlewares = [
  routerMiddleware(history), // for dispatching history actions
  thunk
  // other middlewares ...
]

const initialState = {}

export default createStore(
  createRootReducer(history), // root reducer with router state
  initialState,
  compose(applyMiddleware(...middlewares))
)

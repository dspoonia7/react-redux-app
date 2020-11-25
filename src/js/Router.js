import React from 'react'
import { HashRouter, Switch } from 'react-router-dom'

import MainContainer from './components/MainContainer'

function Router() {
  return (
    <HashRouter>
      <Switch>
        <MainContainer />
      </Switch>
    </HashRouter>
  )
}

export default Router

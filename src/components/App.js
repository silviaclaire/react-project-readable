import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import DefaultView from './DefaultView'
import PostView from './PostView'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/:category/:id' component={PostView}/>
          <Route path='/:category' component={DefaultView}/>
          <Route exact path='/' component={DefaultView}/>
        </Switch>
      </div>
    )
  }
}

export default App
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Home from './views/Home';
import ChatRoom from './views/ChatRoom';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:roomName" component={ChatRoom} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default App;

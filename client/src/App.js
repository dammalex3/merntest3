import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import home from './pages/home';
import GuestInput from "./pages/GuestInput";
import GuestBook from "./pages/GuestBook"
import Login from "./pages/Login"
import Events from "./pages/Events"

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/GuestInput/:EventId" component={GuestInput} />
          <Route exact path="/GuestBook/:EventId" component={GuestBook} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Events" component={Events} />
        </Switch>
    </Router>
  );
}

export default App;
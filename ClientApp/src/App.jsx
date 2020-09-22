import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav/Nav";
import MainPage from "./components/MainPage/MainPage";
import AdminPage from "./components/AdminPage/AdminPage";
import SubmitPage from "./components/SubmitPage/SubmitPage";

import "./app.scss";

export default function App() {
  return (
    <Router>
      <div className="app">
        <Nav />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/submit" component={SubmitPage} />
        </Switch>
      </div>
    </Router>
  );
}

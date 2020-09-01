import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import SubmitPage from "./components/SubmitPage/SubmitPage";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/admin" component={AdminPanel} />
              <Route path="/submit" component={SubmitPage} />
            </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

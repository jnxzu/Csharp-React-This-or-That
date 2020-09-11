import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainPage from "./components/MainPage/MainPage";
import AdminPage from "./components/AdminPage/AdminPage";
import SubmitPage from "./components/SubmitPage/SubmitPage";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/admin" component={AdminPage} />
            <Route path="/submit" component={SubmitPage} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

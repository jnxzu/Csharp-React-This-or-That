import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="header__logo">
          <Link to="/" className="header__font">
            THIS or THAT
          </Link>
        </div>
        <div className="header__submit">
          <Link to="/submit" className="header__font">
            Submit your own card!
          </Link>
        </div>
        <div className="header__admin">
          <Link to="/admin" className="header__font">
            Admin panel
          </Link>
        </div>
      </header>
    );
  }
}

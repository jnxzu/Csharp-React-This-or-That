import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="header-logo">
          <Link to="/" className="header-font">
            THIS or THAT
          </Link>
        </div>
        <div className="header-submit">
          <Link to="/submit" className="header-font">
            Submit your own card!
          </Link>
        </div>
        <div className="header-admin">
          <Link to="/admin" className="header-font">
            Admin panel
          </Link>
        </div>
      </header>
    );
  }
}

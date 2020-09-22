import React from "react";
import { Link } from "react-router-dom";

import "./nav.scss";

export default function Nav() {
  return (
    <div className="nav">
      <h1>
        THIS
        <br />
        or
        <br />
        THAT
      </h1>
      <div className="nav__links">
        <Link to="/">choose!</Link>
        <Link to="/submit">submit a card</Link>
        <Link to="/admin">admin panel</Link>
      </div>
      <h6>
        made by
        {" "}
        <a href="http://www.github.com/jnxzu">jnxzu</a>
      </h6>
    </div>
  );
}

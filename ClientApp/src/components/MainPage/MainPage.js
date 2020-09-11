import React, { Component } from "react";

import ItemCard from "./ItemCard/ItemCard";

import "./mainpage.scss";

export default class MainPage extends Component {
  render() {
    return (
      <div className="main">
        <ItemCard />
        <div className="main__vs">vs</div>
        <ItemCard />
      </div>
    );
  }
}

import React, { Component } from "react";
import ItemCard from "../ItemCard/ItemCard";
import axios from "axios";

import "./home.css";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
    this.getCards = this.getCards.bind(this);
    this.getCards();
  }

  getCards() {
    axios
      .get("/api/carditems")
      .then((res) => this.setState({ items: res.data }));
  }

  render() {
    return (
      <div className="home">
        {this.state.items.length
          ? this.state.items.map((item) => <ItemCard item={item} />)
          : console.log("loading")}
      </div>
    );
  }
}

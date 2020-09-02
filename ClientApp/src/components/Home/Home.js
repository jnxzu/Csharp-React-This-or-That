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
    axios.get("/api/newpair").then((res) => this.setState({ items: res.data }));
  }

  render() {
    return (
      <div className="home">
        {this.state.items.length ? (
          <div className="home__cards">
            <ItemCard item={this.state.items[0]} />
            <ItemCard item={this.state.items[1]} />
          </div>
        ) : (
          <img src="/spinner.gif" alt="loading..."></img>
        )}
      </div>
    );
  }
}

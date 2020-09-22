import React, { Component } from "react";
import axios from "axios";
import ItemCard from "../ItemCard/ItemCard";

import "./mainpage.scss";

export default class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      visible: false,
    };

    this.newPair = this.newPair.bind(this);
    this.chooseCard = this.chooseCard.bind(this);
  }

  componentDidMount() {
    this.newPair();
  }

  newPair() {
    axios.get("pair").then((res) => this.setState({
      items: res.data,
      visible: true,
    }));
  }

  chooseCard(winner, loser) {
    this.setState({ visible: false });
    axios
      .put(
        `choose/${this.state.items[winner].id};${this.state.items[loser].id}`,
      )
      .then(() => setTimeout(() => {
        this.newPair();
      }, 1500));
  }

  render() {
    return (
      <div className="main">
        {this.state.items.length > 0 && (
          <ItemCard
            item={this.state.items[0]}
            onClick={() => this.chooseCard(0, 1)}
            visible={this.state.visible}
          />
        )}

        <div className="main__vs">vs</div>

        {this.state.items.length > 0 && (
          <ItemCard
            item={this.state.items[1]}
            onClick={() => this.chooseCard(1, 0)}
            visible={this.state.visible}
          />
        )}
      </div>
    );
  }
}

import React, { Component } from "react";
import ItemCard from "../ItemCard/ItemCard";
import axios from "axios";

import "./adminpage.scss";

export default class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      selectedName: "",
      selectedId: "",
      controlPopup: false,
    };

    this.remove = this.remove.bind(this);
    this.approve = this.approve.bind(this);
    this.reject = this.reject.bind(this);
  }

  remove() {
    let array = [...this.state.cards];
    array.forEach((card) => {
      if (card.item.id === this.state.selectedId) card.visible = false;
    });
    this.setState({ controlPopup: false, cards: array });
    array = array.filter((card) => card.item.id !== this.state.selectedId);
    let context = this;
    setTimeout(() => {
      this.setState({ cards: array });
    }, 1500);
  }

  approve() {
    this.remove();
    axios.put(`approve/${this.state.selectedId}`);
  }

  reject() {
    this.remove();
    axios.delete(`reject/${this.state.selectedId}`);
  }

  componentDidMount() {
    axios.get("notapproved").then((res) => {
      const visibilityTable = res.data.map((card) => {
        return { item: card, visible: true };
      });
      this.setState({ cards: visibilityTable });
    });
  }

  render() {
    return (
      <div className="admin">
        {this.state.cards.length === 0 && <h2>nothing here...</h2>}
        <div
          className={
            this.state.controlPopup ? "admin__popup show" : "admin__popup hide"
          }
        >
          <button
            className="admin__popup__approve"
            onClick={() => this.approve()}
          >
            Approve {this.state.selectedName}
          </button>
          <button
            className="admin__popup__reject"
            onClick={() => this.reject()}
          >
            Reject {this.state.selectedName}
          </button>
        </div>
        {this.state.cards.map((card) => (
          <ItemCard
            visible={card.visible}
            item={card.item}
            onClick={() => {
              this.setState({
                controlPopup: true,
                selectedName: card.item.name,
                selectedId: card.item.id,
              });
            }}
          />
        ))}
      </div>
    );
  }
}

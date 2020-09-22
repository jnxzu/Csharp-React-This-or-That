import React, { Component } from "react";
import axios from "axios";
import ItemCard from "../ItemCard/ItemCard";

import { PASSWORD } from "../../pw";

import "./adminpage.scss";

export default class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      selectedName: "",
      selectedId: "",
      controlPopup: false,
      auth: false,
      pw: "",
    };

    this.handlePw = this.handlePw.bind(this);
    this.remove = this.remove.bind(this);
    this.approve = this.approve.bind(this);
    this.reject = this.reject.bind(this);
  }

  componentDidMount() {
    axios.get("notapproved").then((res) => {
      const visibilityTable = res.data.map((card) => ({
        item: card,
        visible: true,
      }));
      this.setState({ cards: visibilityTable });
    });
  }

  handlePw(event) {
    const { target } = event;
    const { value } = target;

    if (value === PASSWORD)
      this.setState({
        pw: value,
        auth: true,
      });
    else {
      this.setState({
        pw: value,
      });
    }
  }

  approve() {
    this.remove();
    axios.put(`approve/${this.state.selectedId}`);
  }

  reject() {
    this.remove();
    axios.delete(`reject/${this.state.selectedId}`);
  }

  remove() {
    let array = [...this.state.cards];
    array = array.map((card) => {
      let newCard = {};
      if (card.item.id === this.state.selectedId) {
        newCard = card;
        newCard.visible = false;
        return newCard;
      }
      return card;
    });
    this.setState({ controlPopup: false, cards: array });
    array = array.filter((card) => card.item.id !== this.state.selectedId);
    const context = this;
    setTimeout(() => {
      context.setState({ cards: array });
    }, 1500);
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
            type="submit"
            className="admin__popup__approve"
            onClick={() => this.approve()}
          >
            Approve {this.state.selectedName}
          </button>
          <button
            type="submit"
            className="admin__popup__reject"
            onClick={() => this.reject()}
          >
            Reject {this.state.selectedName}
          </button>
        </div>
        {this.state.auth ? (
          this.state.cards.map((card) => (
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
          ))
        ) : (
          <input
            name="password"
            type="password"
            value={this.state.pw}
            onChange={this.handlePw}
          ></input>
        )}
      </div>
    );
  }
}

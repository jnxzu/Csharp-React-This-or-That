import React, { Component } from "react";

import "./itemcard.scss";

export default class ItemCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      hash: Date.now(),
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item.imageUrl !== this.props.item.imageUrl) {
      this.setState({ loading: true });
    }
  }

  render() {
    return (
      <div
        className={this.props.visible ? "card show" : "card hide"}
        onClick={this.props.onClick}
      >
        <img
          src={`${this.props.item.imageUrl}`}
          style={this.state.loading ? { visibility: "hidden" } : {}}
          alt=""
          className="card__image"
          onLoad={() => this.setState({ loading: false })}
        />
        <div className="card__wrapper">
          <h2 className="card__title">{this.props.item.name}</h2>
          <div className="card__details">
            <p className="card__details__desc">{this.props.item.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

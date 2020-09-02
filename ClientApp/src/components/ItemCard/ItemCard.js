import React, { Component } from "react";

import "./itemcard.css";

export default class ItemCard extends Component {
  render() {
    const backgroundStyle = {
      backgroundImage: `url('${this.props.item.imageUrl}')`,
    };

    return (
      <div className="itemcard">
        <div className="itemcard__image" style={backgroundStyle}></div>
        <h1>{this.props.item.name}</h1>
        <p>{this.props.item.description}</p>
      </div>
    );
  }
}

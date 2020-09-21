import React, { Component } from "react";
import ItemCard from "../ItemCard/ItemCard";

import { debounce } from "lodash";
import axios from "axios";

import "./submitpage.scss";

export default class SubmitPage extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      newItem: {
        name: "",
        description: "",
        imageUrl: "",
        category: "",
      },
      errors: {},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get("categories").then((res) => {
      const defaultCategory = res.data[0];
      this.setState((prevState) => ({
        categories: res.data,
        newItem: {
          ...prevState.newItem,
          category: defaultCategory,
        },
      }));
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState((prevState) => ({
      newItem: {
        ...prevState.newItem,
        [name]: value,
      },
    }));
  }

  handleImageChange = debounce((url) => {
    this.setState((prevState) => ({
      newItem: {
        ...prevState.newItem,
        imageUrl: url,
      },
    }));
  });

  handleSubmit(event) {
    event.preventDefault();
    const errors = {};
    this.setState({ errors: errors });
    const data = this.state.newItem;

    const urlTest = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    if (data.name.length < 1) errors["name"] = "Too short.";
    if (data.name.length > 30) errors["name"] = "Too long.";
    if (data.category === "") errors["category"] = true;
    if (!urlTest.test(data.imageUrl))
      errors["url"] = "Please provide valid URL.";

    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      axios
        .post("create", {
          ...this.state.newItem,
          approved: false,
          rating: 100,
        })
        .then(this.props.history.push("/"));
    } else {
      this.setState({
        errors: errors,
      });
    }
  }

  render() {
    return (
      <div className="submit">
        <ItemCard
          item={this.state.newItem}
          visible={
            this.state.newItem.name.length > 0 ||
            this.state.newItem.imageUrl.length > 0
          }
        />

        <form onSubmit={this.handleSubmit}>
          <select
            className={this.state.errors["category"] && "error"}
            name="category"
            value={this.state.newItem.category}
            onChange={this.handleInputChange}
          >
            {this.state.categories.map((cat) => (
              <option value={cat}>{cat}</option>
            ))}
          </select>
          <input
            className={this.state.errors["name"] && "error"}
            name="name"
            type="text"
            value={this.state.newItem.name}
            placeholder={this.state.errors["name"] || "Name"}
            onChange={this.handleInputChange}
          ></input>
          <input
            className={this.state.errors["url"] && "error"}
            name="imageUrl"
            type="url"
            value={this.state.newItem.imageUrl}
            placeholder={this.state.errors["url"] || "Image Url"}
            onChange={(e) => this.handleImageChange(e.target.value)}
          ></input>
          <textarea
            rows="5"
            name="description"
            value={this.state.newItem.description}
            placeholder="Description"
            onChange={this.handleInputChange}
          ></textarea>
          <input className="btn" type="submit" value="submit"></input>
        </form>
      </div>
    );
  }
}

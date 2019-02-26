import React, { Component } from "react";
import { formatPrice } from "../helpers";
import PropTypes from "prop-types";

class Fish extends Component {
  static propTypes = {
    details: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func.isRequired,
    fishKey: PropTypes.string.isRequired
  };

  render() {
    const { fishKey, addToOrder } = this.props;
    const { name, image, desc, price, status } = this.props.details;
    const isAvailable = status === "available";
    const btnText = isAvailable ? "Add to order" : "Sold out!";
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={() => addToOrder(fishKey)}>
          {btnText}
        </button>
      </li>
    );
  }
}

export default Fish;

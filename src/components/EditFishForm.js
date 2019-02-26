import React, { Component } from "react";
import PropTypes from "prop-types";

class EditFishForm extends Component {
  static propTypes = {
    fishKey: PropTypes.string.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    fish: PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired
    })
  };

  handleChange = e => {
    const { fishKey, updateFish } = this.props;

    // 1. Update fish
    const newValue =
      e.target.name === "price" ? parseInt(e.target.value) : e.target.value;

    const updatedFish = {
      ...this.props.fish,
      [e.target.name]: newValue
    };

    this.props.updateFish(fishKey, updatedFish);
  };

  render() {
    const { fishKey, fish, deleteFish } = this.props;

    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          value={fish.name}
          onChange={this.handleChange}
        />
        <input
          type="number"
          name="price"
          value={fish.price}
          onChange={this.handleChange}
        />
        <select name="status" value={fish.status} onChange={this.handleChange}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea name="desk" value={fish.desc} onChange={this.handleChange} />
        <input
          type="text"
          name="image"
          value={fish.image}
          onChange={this.handleChange}
        />
        <button onClick={() => deleteFish(fishKey)}>Remove Fish</button>
      </div>
    );
  }
}

export default EditFishForm;

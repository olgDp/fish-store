import React, { Component } from "react";
import PropTypes from "prop-types";

class AddForm extends Component {
  static propTypes = {
    addFish: PropTypes.func.isRequired
  };

  createFish = e => {
    e.preventDefault();

    const { nameRef, priceRef, statusRef, deskRef, imageRef } = this.refs;

    const fish = {
      name: nameRef.value,
      price: parseFloat(priceRef.value),
      status: statusRef.value,
      desk: deskRef.value,
      image: imageRef.value
    };

    this.props.addFish(fish);
    e.currentTarget.reset();
  };

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input type="text" name="name" ref="nameRef" placeholder="Name" />
        <input type="text" name="price" ref="priceRef" placeholder="Price" />
        <select name="status" ref="statusRef">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea name="desk" ref="deskRef" placeholder="Desk" />
        <input type="text" name="image" ref="imageRef" placeholder="Image" />

        <button type="submit">+ Add fish</button>
      </form>
    );
  }
}

export default AddForm;

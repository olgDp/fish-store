import React, { Component } from "react";
import { getFunName } from "../helpers";

class StorePicker extends Component {
  goToStore = e => {
    // 1. Stop the form from submitting
    e.preventDefault();

    // 2. Get the text from that input
    const newPath = this.refs.myInput.value;

    // 3. Change the page to /store/whatever-they-entered
    this.props.history.push(`/store/${newPath}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input
          type="text"
          ref="myInput"
          required
          placeholder="Store name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit store →</button>
      </form>
    );
  }
}

export default StorePicker;

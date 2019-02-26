import React, { Component } from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";
import PropTypes from "prop-types";

class App extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);

    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addFish = fish => {
    this.setState(({ fishes }) => {
      fishes[`fish${Date.now()}`] = fish;

      return { fishes };
    });
  };

  updateFish = (key, fish) => {
    this.setState(state => {
      const fishes = {
        ...state.fishes,
        [key]: fish
      };

      return {
        fishes
      };
    });
  };

  deleteFish = key => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;

    this.setState({ fishes });
  };

  addToOrder = key => {
    this.setState(({ order }) => {
      if (Object.keys(order).indexOf(key) === -1) {
        order[key] = 1;
      } else {
        order[key] = order[key] + 1;
      }

      return { order };
    });
  };

  removeFromOrder = key => {
    const order = { ...this.state.order };
    delete order[key];

    this.setState({ order });
  };

  render() {
    const { fishes, order } = this.state;
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood market" />
          <ul className="fishes">
            {Object.keys(fishes).map(key => {
              return (
                <Fish
                  key={key}
                  fishKey={key}
                  details={fishes[key]}
                  addToOrder={this.addToOrder}
                />
              );
            })}
          </ul>
        </div>

        <Order {...this.state} removeFromOrder={this.removeFromOrder} />
        <Inventory
          storeId={this.props.match.params.storeId}
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={fishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
        />
      </div>
    );
  }
}

export default App;

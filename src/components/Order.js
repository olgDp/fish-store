import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    removeFromOrder: PropTypes.func.isRequired
  };

  render() {
    const { fishes, order, removeFromOrder } = this.props;
    const orderIds = Object.keys(order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishes[key];
      const count = order[key];
      const isAvailable = fish && fish.status === "available";

      if (isAvailable) {
        return prevTotal + count * fish.price;
      } else {
        return prevTotal;
      }
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(key => {
            const transitionOptions = {
              classNames: "order",
              key,
              timeout: { enter: 500, exit: 500 }
            };
            const fish = fishes[key];
            const count = order[key];
            const isAvailable = fish && fish.status === "available";

            // проверка что рыба загрузилась перед выводом на экран
            if (!fish) return null;

            if (isAvailable) {
              return (
                <CSSTransition {...transitionOptions}>
                  <li
                    key={key}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>
                      <TransitionGroup component="span" className="count">
                        <CSSTransition {...transitionOptions}>
                          <span>{count}</span>
                        </CSSTransition>
                      </TransitionGroup>
                      lbs {fish.name}
                      {formatPrice(count * fish.price)}
                      <button onClick={() => removeFromOrder(key)}>
                        &times;
                      </button>
                    </span>
                  </li>
                </CSSTransition>
              );
            } else {
              return (
                <CSSTransition
                  classNames="order"
                  key={key}
                  timeout={{ enter: 500, exit: 500 }}
                >
                  <li key={key}>
                    Sorry {fish ? fish.name : "fish"} is no longer available
                  </li>
                </CSSTransition>
              );
            }
          })}
        </TransitionGroup>
        <div className="total">
          Total:&nbsp;
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;

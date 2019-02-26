import React, { Component } from "react";
import AddForm from "./AddForm";
import EditFishForm from "./EditFishForm";
import PropTypes from "prop-types";
import Login from "./Login";
import firebase from "firebase";
import base, { firebaseApp } from "../base";

class Inventory extends Component {
  static propTypes = {
    addFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired
  };

  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    // 1. Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });

    // 2. Claim it if there is no owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // 3. Set the state of the inventory component to reflect the current user
    this.setState(state => {
      return {
        uid: authData.user.uid,
        owner: store.owner || authData.user.uid
      };
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logOut = async () => {
    await firebase.auth().signOut();
    this.setState((state, props) => {
      return { uid: null };
    });
  };

  render() {
    const {
      addFish,
      loadSampleFishes,
      fishes,
      updateFish,
      deleteFish
    } = this.props;

    const { uid, owner } = this.state;

    const logOut = <button onClick={this.logOut}>Log Out</button>;

    // 1. Check if they are logged in
    if (!uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // 2. Check if they are not owner of the store
    if (uid !== owner) {
      return (
        <div className="inventory">
          <p>Sorry you are not the owner</p>
          {logOut}
        </div>
      );
    }

    // 3. They must be the owner, just render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logOut}
        {Object.keys(fishes).map(key => {
          return (
            <EditFishForm
              key={key}
              fish={fishes[key]}
              fishKey={key}
              updateFish={updateFish}
              deleteFish={deleteFish}
            />
          );
        })}

        <AddForm addFish={addFish} />

        <button onClick={loadSampleFishes}>Load sample fishes</button>
      </div>
    );
  }
}

export default Inventory;

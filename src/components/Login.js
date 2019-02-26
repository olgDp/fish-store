import React from "react";
import PropTypes from "prop-types";

const Login = ({ authenticate }) => {
  return (
    <nav className="login">
      <h2>Inventory login</h2>
      <p>Sign in to manage your store's inventory</p>
      <button className="github" onClick={() => authenticate("Github")}>
        Log in with Github
      </button>
      <button className="facebook" onClick={() => authenticate("Facebook")}>
        Log in with Facebook
      </button>
    </nav>
  );
};

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;

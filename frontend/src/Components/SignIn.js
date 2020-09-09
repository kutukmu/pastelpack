import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { signInAction } from "../Actions/index";

class SingIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      hidden: true,
    };
  }

  handleSubmit = async (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    this.props.signInAction({ email, password });
  };

  renderMessage = () => {
    const { loading, error } = this.props.signInUser;

    return (
      <div>
        {loading && <div className="msg">Please Wait ...</div>}
        {error && (
          <div className="msg fail ">
            {error}
            <span role="img" aria-label="emoji">
              ❗
            </span>{" "}
          </div>
        )}
      </div>
    );
  };

  render() {
    return (
      <div className="split-screen">
        <div className="left diff">
          <section className="copy">
            <h1>Find your next favorite Tshirt </h1>
            <h1>All tech related shirts are here</h1>
          </section>
        </div>
        <div className="right">
          <form onSubmit={this.handleSubmit}>
            <section className="copy">
              <h2>Sign In</h2>
              <div className="login-container">
                <p>
                  Need to create an account?{" "}
                  <Link to="/signup">
                    <strong>Sign Up</strong>
                  </Link>
                </p>
              </div>
            </section>
            {this.renderMessage()}

            <div className="input-container email">
              <label htmlFor="email">Email</label>
              <input
                className="input"
                onChange={(e) => this.setState({ email: e.target.value })}
                value={this.state.email}
                id="email"
                name="email"
                type="email"
              />
            </div>
            <div className="input-container password">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className="input"
                name="password"
                type={this.state.hidden ? "password" : "text"}
                value={this.state.password}
                minLength="6"
                onChange={(e) => this.setState({ password: e.target.value })}
                placeholder="Must be at least 6 characters"
              />
              <AiOutlineEyeInvisible
                onClick={(e) => this.setState({ hidden: !this.state.hidden })}
                className="eye"
              />
            </div>

            <button className="signup-btn" type="submit">
              Sign In
            </button>
            <section className="copy legal">
              <p>
                <span className="small">
                  By continuing, you agree to accept our <br />
                  <Link to="/returnpolicy">Return Policy</Link>
                </span>
              </p>
            </section>
          </form>
        </div>
      </div>
    );
  }
}

const getState = (state) => {
  return {
    signInUser: state.signInUser,
  };
};

export default connect(getState, { signInAction })(SingIn);

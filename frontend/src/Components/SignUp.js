import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { userSignUpAction } from "../Actions/index";

class SingIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      password: "",
      confirm: "",
      hidden: true,
      showMessage: false,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirm } = this.state;
    const user = { name, email, password };
    if (password !== confirm) {
      this.setState({ isSame: false });
    }

    if (password === confirm) {
      this.props.userSignUpAction(user);
    }
  };

  renderMessage = () => {
    const { loading, error, user } = this.props.signUpUser;

    return (
      <div>
        {loading && <div className="msg">Creating Account</div>}
        {error && (
          <div className="msg fail ">
            User Already exist
            <span role="img" aria-label="emoji">
              ❗
            </span>{" "}
          </div>
        )}
        {user && (
          <div className="msg success">
            {" "}
            <span role="img" aria-label="emoji">
              ✔{" "}
            </span>
            We send you email confimation message{" "}
          </div>
        )}
      </div>
    );
  };

  render() {
    return (
      <div className="split-screen">
        <div className="left">
          <section className="copy">
            <h1>Explore Our new Tshirts</h1>
            <h1>Over 20 products designed by real creatives</h1>
          </section>
        </div>
        <div className="right">
          <form onSubmit={this.handleSubmit}>
            <section className="copy">
              <h2>Sign Up</h2>
              <div className="login-container">
                <p>
                  Already have an account?{" "}
                  <Link to="/signin">
                    <strong>Log In</strong>
                  </Link>
                </p>
              </div>
            </section>
            {this.renderMessage()}
            <div className="input-container name">
              <label htmlFor="name">Full Name</label>
              <input
                className="input"
                id="name"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
                name="name"
                type="text"
              />
            </div>
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

            <div className="input-container password">
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                id="confirmpassword"
                className="input"
                name="confirm"
                minLength="6"
                type={this.state.hidden ? "password" : "text"}
                value={this.state.confirm}
                placeholder="Must be at least 6 characters"
                onChange={(e) => this.setState({ confirm: e.target.value })}
              />
              <AiOutlineEyeInvisible
                onClick={(e) => this.setState({ hidden: !this.state.hidden })}
                className="eye"
              />
            </div>
            <button className="signup-btn" type="submit">
              Sign Up
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
    signUpUser: state.signUpUser,
  };
};

export default connect(getState, { userSignUpAction })(SingIn);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { getNumberOfItem, logOutAction, closeBarAction } from "../Actions";
import { connect } from "react-redux";

class sideBar extends Component {
  componentDidMount() {
    const id = this.props.user._id;
    if (id) {
      this.props.getNumberOfItem(id);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.user !== this.props.user ||
      prevProps.cartItems !== this.props.cartItems
    ) {
      const id = this.props.user._id;
      if (id) {
        this.props.getNumberOfItem(id);
      }
    }
  }
  render() {
    const { name } = this.props.user;
    return (
      <div className="sidebar">
        <div className="sidebar-inner">
          <div className="brand">
            <Link to="/">PastelPack</Link>
            <AiOutlineCloseCircle
              className="close-icon"
              onClick={this.props.closeBarAction}
            />
          </div>

          <ul className="sidebar-nav">
            <li>
              <Link
                to="/"
                className="nav-link"
                onClick={this.props.closeBarAction}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                className="nav-link"
                onClick={this.props.closeBarAction}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="nav-link"
                onClick={this.props.closeBarAction}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="nav-link"
                onClick={this.props.closeBarAction}
              >
                Faq
              </Link>
            </li>
            <li>
              {!name ? (
                <Link
                  to="/signin"
                  onClick={this.props.closeBarAction}
                  className="login"
                >
                  <BiUserCircle className="prof-icon" />
                  Login
                </Link>
              ) : (
                <div className="username">
                  <h2>{name}</h2>
                  <div className="username-inner">
                    <Link
                      to={`/profile/${this.props.user._id}`}
                      onClick={this.props.closeBarAction}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        this.props.logOutAction();
                        this.props.closeBarAction();
                      }}
                    >
                      {" "}
                      Log Out{" "}
                    </button>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const getState = (state) => {
  return {
    user: state.signInUser,
    cartItem: state.cartNumber,
    cartItems: state.cartItems,
  };
};

const mapDispatchToProps = {
  getNumberOfItem,
  logOutAction,
  closeBarAction,
};

export default connect(getState, mapDispatchToProps)(sideBar);

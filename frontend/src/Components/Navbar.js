import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RiShoppingCart2Line } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";
import { FiAlignRight } from "react-icons/fi";
import { getNumberOfItem, logOutAction, openBarAction } from "../Actions";
import { connect } from "react-redux";

class Navbar extends Component {
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
    const { name, isAdmin } = this.props.user;
    const { items } = this.props.cartItem;

    if (items) {
      this.num = items.length;
    }

    return (
      <div className="navbar">
        <div className="container">
          <div className="navbar-inner">
            <div className="brand">
              <Link to="/">PastelPack</Link>
            </div>
            <ul className="navbar-nav">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="nav-link">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="nav-link">
                  Faq
                </Link>
              </li>
            </ul>
            <ul className="navbar-icons">
              <li>
                <Link to={name ? `/cart` : `/signin`} className="cart-icon">
                  <RiShoppingCart2Line />
                  {name && (
                    <div className="item-num">{items ? items.length : 0}</div>
                  )}
                </Link>
              </li>
              <li className="name-li">
                {!name ? (
                  <Link to="/signin">
                    <BiUserCircle />
                  </Link>
                ) : (
                  <div className="username">
                    <Link to={`/profile/${this.props.user._id}`}>{name}</Link>

                    {isAdmin ? (
                      <div className="dropdown">
                        <ul>
                          <li>
                            {isAdmin ? (
                              <div>
                                <Link to="/product">Add Item</Link>
                                <Link to="/editproducts" className="edit">
                                  Edit Items
                                </Link>
                                <Link to="/editorders">Edit Orders</Link>
                                <button
                                  onClick={() => this.props.logOutAction()}
                                >
                                  {" "}
                                  Log Out{" "}
                                </button>
                              </div>
                            ) : null}
                          </li>
                        </ul>
                      </div>
                    ) : null}
                  </div>
                )}
              </li>
              <li className="toggle-btn">
                <FiAlignRight
                  className="toggle-icon"
                  onClick={this.props.openBarAction}
                />
              </li>
            </ul>
          </div>
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

export default connect(getState, {
  getNumberOfItem,
  logOutAction,
  openBarAction,
})(Navbar);

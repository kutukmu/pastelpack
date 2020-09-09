import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getNumberOfItem,
  removeItemAction,
  increaseQtyAction,
  decreaseQtyAction,
  changeSizeAction,
} from "../Actions";
import { IoIosRemove } from "react-icons/io";
import Footer from "./footer";

export class CartScreen extends Component {
  componentDidMount() {
    const id = this.props.user._id;
    if (id) {
      this.props.getNumberOfItem(id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isDeleted !== this.props.isDeleted) {
      const id = this.props.user._id;
      if (id) {
        this.props.getNumberOfItem(id);
      }
    }

    if (prevProps.qtyIncrease !== this.props.qtyIncrease) {
      const id = this.props.user._id;
      if (id) {
        this.props.getNumberOfItem(id);
      }
    }
  }

  handleRemove = (itemid) => {
    const id = this.props.user._id;
    this.props.removeItemAction(id, itemid);
  };

  decrease = (id, val) => {
    const userid = this.props.user._id;
    if (val > 0) {
      this.props.decreaseQtyAction(userid, id, val);
    }
  };

  increase = (id, val) => {
    const userid = this.props.user._id;

    this.props.increaseQtyAction(userid, id, val);
  };

  sizeChange = (id, val) => {
    const userid = this.props.user._id;

    this.props.changeSizeAction(userid, id, val);
  };
  calcTotalQty = () => {
    const { items } = this.props.items;
    if (items) {
      if (!items.length) {
        return 0;
      } else {
        return items.reduce((a, c) => a + c.qty, 0);
      }
    }
  };

  calcSubtotal = () => {
    const { items } = this.props.items;
    if (items) {
      if (!items.length) {
        return 0;
      } else {
        return items.reduce((a, c) => a + c.qty * c.price, 0);
      }
    }
  };

  renderItems = () => {
    const { items } = this.props.items;

    if (items) {
      if (!items.length) {
        return <h1>Cart is empty</h1>;
      } else {
        return items.map((item, idx) => {
          return (
            <div className="item" key={idx}>
              <div className="item-img">
                <img src={item.image} alt="img" />
              </div>
              <div className="item-info">
                <div className="titles">
                  <h3>{item.name}</h3>
                  <h4>${item.price}</h4>
                </div>
                <div className="qty-buttons">
                  <div className="qty">
                    <button
                      onClick={() => this.decrease(item._id, item.qty - 1)}
                    >
                      <IoIosRemove className="remove-icon" />
                    </button>
                    <div className="num-cont">
                      <h4> {item.qty} </h4>
                    </div>

                    <button
                      onClick={() => this.increase(item._id, item.qty + 1)}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>

                  <div className="size-btns">
                    <h3>Size </h3>
                    <select
                      value={item.size}
                      onChange={(e) =>
                        this.sizeChange(item._id, e.target.value)
                      }
                    >
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="remove">
                <button
                  className="btn-rmv"
                  onClick={() => this.handleRemove(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        });
      }
    } else {
      return <h1>Loading...</h1>;
    }
  };

  render() {
    const { items } = this.props.items;
    return (
      <div className="cart-footer">
        <div className="cart">
          <div className="container">
            <div className="inner-cart">
              <div className="item-total">
                <div className="item-container">{this.renderItems()}</div>
                <div className="subtotal">
                  <h4>Item Number: {this.calcTotalQty()}</h4>
                  <h4>Sub Total: $ {this.calcSubtotal()}</h4>
                </div>
              </div>

              {items && (
                <Link
                  to="/shipping"
                  className={`placeorder  ${!items.length ? "disable" : null}`}
                >
                  Proceed To Chekout
                </Link>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.signInUser,
  items: state.cartNumber,
  isDeleted: state.isDeleted,
  qtyIncrease: state.qtyIncrease,
});

const mapDispatchToProps = {
  getNumberOfItem,
  removeItemAction,
  increaseQtyAction,
  decreaseQtyAction,
  changeSizeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);

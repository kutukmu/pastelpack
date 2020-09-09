import React, { Component } from "react";
import { connect } from "react-redux";
import Steps from "./steps";
import { Link } from "react-router-dom";
import Footer from "./footer";
import { getNumberOfItem, orderAction } from "../Actions";
export class placeOrder extends Component {
  componentDidMount() {
    const id = this.props.user._id;
    if (id) {
      this.props.getNumberOfItem(id);
    }
  }

  renderItems = () => {
    const { items } = this.props.items;

    if (items) {
      if (!items.length) {
        return <h1>Cart is empty</h1>;
      } else {
        return items.map((item) => {
          return (
            <div className="item">
              <div className="item-img">
                <div className="img">
                  <img src={item.image} alt="tshirt" />
                </div>
              </div>
              <div className="item-info">
                <Link to={`/item/${item.itemid}`}>{item.name}</Link>
                <h4>Qty: {item.qty}</h4>
                <h4>Size: {item.size}</h4>
              </div>
              <div className="item-price">
                <h4>${item.price}</h4>
              </div>
            </div>
          );
        });
      }
    }
  };

  calcSub = () => {
    const { items } = this.props.items;
    if (items) {
      if (!items.length) {
        return 0;
      } else {
        return items.reduce((a, c) => a + c.qty * c.price, 0);
      }
    }
  };

  calcTax = () => {
    const { items } = this.props.items;
    if (items) {
      if (!items.length) {
        return 0;
      } else {
        return Number((this.calcSub() * 0.0625).toFixed(2));
      }
    }
  };

  calcShipping = () => {
    let total = this.calcSub();

    if (total > 100) {
      return 0;
    } else {
      return 5;
    }
  };

  calcTotal = () => {
    const total = this.calcShipping() + this.calcSub() + this.calcTax();

    return total;
  };

  handleClick = () => {
    const userid = this.props.user._id;
    const shipping = this.props.shipping;
    const subtotal = this.calcSub();
    const taxFee = this.calcTax();
    const shippingfee = this.calcShipping();
    const total = this.calcTotal();
    const { items } = this.props.items;

    this.props.orderAction(
      userid,
      shipping,
      subtotal,
      taxFee,
      shippingfee,
      total,
      items
    );
  };

  render() {
    const { address, city, zipcode, states, country } = this.props.shipping;
    const { payment } = this.props.payment;

    return (
      <div className="placeorder">
        <div className="container">
          <div className="inner-placeorder">
            <Steps step1 step2 step3 step4 />
            <div className="order-details">
              <div className="left">
                <div className="shipping-details">
                  <h2>Shipping Address</h2>

                  {this.props.shipping.address ? (
                    <h5 className="address">
                      {address}, {zipcode}, {city}, {states}, {country}
                    </h5>
                  ) : (
                    <h5>Address not found</h5>
                  )}
                </div>
                <div className="payment-details">
                  <h2>Payment Method</h2>
                  <h5 className="payment">{payment}</h5>
                </div>
                <div className="items-details">
                  <div className="title">
                    <h2>Order Items</h2>
                    <h4>Price</h4>
                  </div>
                  <div className="items-container">{this.renderItems()}</div>
                </div>
              </div>
              <div className="right">
                <h1>Order Summary</h1>
                <div className="order-info">
                  <div className="sub">
                    <h1>Item:</h1>
                    <h1> $ {this.calcSub()}</h1>
                  </div>
                  <div className="sub">
                    {" "}
                    <h1>Shipping</h1>
                    <h1>
                      {this.calcShipping()
                        ? `$ ${this.calcShipping()}`
                        : "Free"}
                    </h1>
                  </div>
                  <div className="sub">
                    <h1>Tax</h1> <h1>$ {this.calcTax()}</h1>
                  </div>
                  <div className="sub">
                    <h1 className="total">Order Total</h1>
                    <h1>$ {this.calcTotal() ? this.calcTotal() : "0"}</h1>
                  </div>
                </div>
                <button onClick={this.handleClick}>Place Order</button>
              </div>
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
  shipping: state.userAddress,
  payment: state.payment,
  items: state.cartNumber,
});

const mapDispatchToProps = { getNumberOfItem, orderAction };

export default connect(mapStateToProps, mapDispatchToProps)(placeOrder);

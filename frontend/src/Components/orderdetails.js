import React, { Component } from "react";
import { connect } from "react-redux";
import Steps from "./steps";
import Footer from "./footer";
import { Link } from "react-router-dom";
import { getOrderAction, stripeAction } from "../Actions";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StripeCheckout from "react-stripe-checkout";

toast.configure();
export class placeOrder extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getOrderAction(id);
    toast.configure();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.stripe !== this.props.stripe) {
      if (this.props.stripe.status) {
        if (this.props.stripe.status === "success") {
          toast("Successfull, plase check your email", {
            type: "success",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast("Something went wrong", {
            type: "error",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    }
  }

  renderItems = () => {
    const { order } = this.props.orderDetails;

    if (!order) {
      return <h1>Loading ... </h1>;
    } else {
      return order.orderItems.map((item) => {
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
  };

  handleToken = async (token) => {
    const { order } = this.props.orderDetails;

    this.props.stripeAction(order._id, order.user, token, order.orderItems);
  };

  renderpage = () => {
    const { order } = this.props.orderDetails;
    if (order) {
      const {
        payment,
        isPaid,
        isDelivered,
        shipping,
        itemTotal,
        shippingFee,
        taxFee,
        total,
        _id,
       
      } = order;
      const { address, city, zipcode, states, country } = shipping;

      return (
        <div className="order-details">
          <div className="left">
            <div className="orderid">
              <h2 className="order">Order Id: {_id}</h2>
            </div>
            <div className="shipping-details">
              <h2>Shipping Address</h2>

              <h5 className="address">
                {address}, {zipcode}, {city}, {states}, {country}
              </h5>
              <h5>{isDelivered ? "Delivered" : "Not Delivered"}</h5>
            </div>
            <div className="payment-details">
              <h2>Payment Method</h2>
              <h5 className="payment">{payment}</h5>
              <h5>{isPaid ? "Paid" : "Not Paid"}</h5>
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
                <h1> $ {itemTotal}</h1>
              </div>
              <div className="sub">
                {" "}
                <h1>Shipping</h1>
                <h1>{shippingFee}</h1>
              </div>
              <div className="sub">
                <h1>Tax</h1> <h1>$ {taxFee}</h1>
              </div>
              <div className="sub">
                <h1 className="total">Order Total</h1>
                <h1>$ {total}</h1>
              </div>
            </div>
            {!isPaid ? (
              <StripeCheckout
                stripeKey="pk_test_51HHhV8Atw8ZjzTv82jHZkUMjDygyE4qCyhlFb1BiFVex54QAvMPKVsBQUEajRahFwwxvo2mCR8rkLqsciVQ1LTFh00xfuB9QIh"
                token={this.handleToken}
                amount={total * 100}
                billingAddress={false}
                shippingAddress
              />
            ) : null}
          </div>
        </div>
      );
    } else {
      return <h1 style={{ marginTop: "5rem" }}>Loading...</h1>;
    }
  };

  render() {
    this.renderpage();

    return (
      <div className="placeorder">
        <div className="container">
          <div className="inner-placeorder">
            <Steps step1 step2 step3 step4 />
            {this.renderpage()}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  orderDetails: state.orderDetails,
  stripe: state.stripe,
});

const mapDispatchToProps = {
  getOrderAction,
  stripeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(placeOrder);

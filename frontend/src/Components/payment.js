import React, { Component } from "react";
import { connect } from "react-redux";
import Steps from "./steps";
import { paymentSaveAction } from "../Actions";

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payment: "Card",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.paymentSaveAction(this.state.payment);
  };

  render() {
    return (
      <div className="payment">
        <div className="container">
          <div className="payment-inner">
            <Steps step1 step2 step3 />
            <div className="payment-card">
              <h1>Payment</h1>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="radio"
                  name="payment"
                  checked
                  value="Card"
                  onChange={(e) => this.setState({ payment: e.target.value })}
                />
                <label htmlFor="payment">Card</label>

                <button className="btn" type="submit">
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  paymentSaveAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

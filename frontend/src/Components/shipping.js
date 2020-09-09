import React, { Component } from "react";

import { connect } from "react-redux";
import { addressSaveAction } from "../Actions";
import Steps from "./steps";

export class Shipping extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      city: "",
      zipcode: "",
      states: "",
      country: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addressSaveAction(this.state);
  };

  render() {
    return (
      <div className="shipping-screen">
        <div className="container">
          <div className="inner-shipping">
            <div className="shipping-form">
              <Steps step1 step2 />
              <div className="form">
                <form onSubmit={this.handleSubmit}>
                  <section className="copy">
                    <h2>Address</h2>
                  </section>

                  <div className="input-container name">
                    <label htmlFor="address">Address</label>
                    <input
                      className="input"
                      id="address"
                      required
                      value={this.state.address}
                      onChange={(e) =>
                        this.setState({ address: e.target.value })
                      }
                      name="address"
                      type="text"
                    />
                  </div>
                  <div className="input-container email">
                    <label htmlFor="city">City</label>
                    <input
                      className="input"
                      required
                      onChange={(e) => this.setState({ city: e.target.value })}
                      value={this.state.city}
                      id="city"
                      name="city"
                      type="text"
                    />
                  </div>
                  <div className="input-container email">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input
                      className="input"
                      required
                      onChange={(e) =>
                        this.setState({ zipcode: e.target.value })
                      }
                      value={this.state.zipcode}
                      id="zipcode"
                      name="zipcode"
                      type="text"
                    />
                  </div>
                  <div className="input-container email">
                    <label htmlFor="states">States</label>
                    <input
                      className="input"
                      required
                      onChange={(e) =>
                        this.setState({ states: e.target.value })
                      }
                      value={this.state.states}
                      id="states"
                      name="states"
                      type="text"
                    />
                  </div>

                  <div className="input-container email">
                    <label htmlFor="country">Country</label>
                    <input
                      className="input"
                      required
                      onChange={(e) =>
                        this.setState({ country: e.target.value })
                      }
                      value={this.state.country}
                      id="country"
                      name="country"
                      type="text"
                    />
                  </div>

                  <button className="signup-btn" type="submit">
                    Continue
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { addressSaveAction };

export default connect(mapStateToProps, mapDispatchToProps)(Shipping);

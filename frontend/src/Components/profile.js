import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "./footer";
import { getUserOrders } from "../Actions";
import { logOutAction } from "../Actions";
class profile extends Component {
  componentDidMount() {
    const id = this.props.user._id;
    if (id) {
      this.props.getUserOrders(id);
    }
  }

  render() {
    const { orders } = this.props.userOrders;
    return (
      <div className="profile-fot">
        <div className="profile">
          <div className="container">
            <div className="profile-inner">
              <h1>Kerim Kutuk</h1>
              <h3>Orders</h3>
              <div className="order-table">
                <table cellSpacing="5px">
                  <thead>
                    <tr>
                      <th>Order Id</th>
                      <th className="date">Date</th>
                      <th className="Total">Total</th>
                      <th className="delivered">Delivered</th>
                      <th className="isPaid">Paid</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders &&
                      orders.map((order, idx) => {
                        return (
                          <tr key={idx}>
                            <td className="orderid">{order._id}</td>
                            <td className="crt">{order.createdAt}</td>
                            <td className="total">$ {order.total}</td>
                            <td className="delivr">
                              {order.isDelivered ? "Yes" : "No"}
                            </td>
                            <td className="ispaid">
                              {order.isPaid ? "Yes" : "No"}
                            </td>
                            <td>
                              <Link to={`/order/${order._id}`}>Details</Link>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="logout">
                <button
                  onClick={() => {
                    this.props.logOutAction();
                  }}
                >
                  {" "}
                  Log Out{" "}
                </button>
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
  userOrders: state.userOrders,
});

const mapDispatchToProps = {
  getUserOrders,
  logOutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(profile);

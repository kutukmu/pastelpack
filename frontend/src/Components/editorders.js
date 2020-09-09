import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrders, updateOrderAction } from "../Actions";
class editorders extends Component {
  componentDidMount() {
    this.props.getAllOrders();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.orderUpdate !== prevProps.orderUpdate) {
      if (this.props.orderUpdate.success) {
        this.props.getAllOrders();
      }
    }
  }

  handleClick = (id) => {
    this.props.updateOrderAction(id);
  };

  render() {
    const { orders } = this.props.allorders;
    return (
      <div className="profile">
        <div className="container">
          <div className="profile-inner">
            <h1>All Orders</h1>

            <div className="order-table">
              <table cellSpacing="5px">
                <thead>
                  <tr>
                    <th>Order Id</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Delivered</th>
                    <th>Paid</th>
                    <th>Action</th>
                    <th>Delivered?</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.map((order, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{order._id}</td>
                          <td>{order.createdAt}</td>
                          <td>$ {order.total}</td>
                          <td>{order.isDelivered ? "Yes" : "No"}</td>
                          <td>{order.isPaid ? "Yes" : "No"}</td>
                          <td>
                            <Link to={`/order/${order._id}`}>Details</Link>
                          </td>
                          <td>
                            <button onClick={() => this.handleClick(order._id)}>
                              Check Delivered
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allorders: state.allorders,
  orderUpdate: state.orderUpdate,
});

const mapDispatchToProps = { getAllOrders, updateOrderAction };

export default connect(mapStateToProps, mapDispatchToProps)(editorders);

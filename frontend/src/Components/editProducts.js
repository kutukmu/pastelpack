import React, { Component } from "react";
import { getProductsAction, deleteProductAction } from "../Actions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class editProducts extends Component {
  componentDidMount() {
    this.props.getProductsAction();
  }

  handleDelete = (id) => {
    this.props.deleteProductAction(id);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.productDelete !== this.props.productDelete) {
      this.props.getProductsAction();
    }
  }

  render() {
    const { loading, list } = this.props.list;

    return (
      <div className="edit-product">
        <div className="container">
          {loading && "Loading"}
          <div className="edit-product-inner">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Stock</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.image.substring(0, 20)}</td>
                        <td>{item.description.substring(0, 20)}</td>
                        <td>{item.stock}</td>
                        <td>{item.category}</td>
                        <td>
                          <Link
                            to={`/editItem/${item._id}`}
                            className="edit-btn"
                          >
                            Edit
                          </Link>
                          <button
                            className="delete-btn"
                            onClick={() => this.handleDelete(item._id)}
                          >
                            Delete
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
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.productList,
  productDelete: state.productDelete,
});

const mapDispatchToProps = {
  getProductsAction,
  deleteProductAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(editProducts);

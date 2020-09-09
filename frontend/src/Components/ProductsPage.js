import React, { Component } from "react";
import { getProductsAction, addToCartAction } from "../Actions";
import { FaCartArrowDown } from "react-icons/fa";
import { connect } from "react-redux";
import Rating from "./rating";
import Footer from "./footer";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
toast.configure();
class ProductPage extends Component {
  componentDidMount() {
    this.props.getProductsAction();
  }

  calcRating = (product) => {
    const rating = (
      product.reviews.reduce((a, c) => a + Number(c.rating), 0) /
      product.reviews.length
    ).toFixed(1);
    return rating > 0 ? rating : 0;
  };

  handleClick = (itemid) => {
    const id = this.props.user._id;
    if (id) {
      this.props.addToCartAction(itemid);
      toast("🤩 There you go !!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      this.props.history.push("/signin");
    }
  };

  render() {
    const { list } = this.props.productList;
    return (
      <div>
        <div className="products-page">
          <div className="container">
            <div className="products-page-inner">
              <div className="products-container">
                {list &&
                  list.map((product, idx) => {
                    return (
                      <div className="product" key={idx}>
                        <div className="new-tag">
                          <img src="/images/new.png" alt="newtag" />
                        </div>
                        <div className="img">
                          <img src={product.image} alt="img" />
                        </div>
                        <div className="product-body">
                          <div className="body-top">
                            <Link to={`/item/${product._id}`}>
                              {product.name}
                            </Link>
                            <button
                              onClick={() => this.handleClick(product._id)}
                            >
                              <FaCartArrowDown className="icon" />
                            </button>
                          </div>
                          <div className="body-bottom">
                            <div className="stars">
                              <Rating rating={this.calcRating(product)} />
                            </div>
                            <div className="review">{`( ${product.reviews.length} reviews )`}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="product-abs-images">
              <img src="/images/blob2.png" className="corner" alt="blob" />

              <img src="/images/products2.png" className="right" alt="blob" />
              <img src="/images/products3.png" className="top" alt="blob" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productList: state.productList,
  user: state.signInUser,
});

const mapDispatchToProps = { getProductsAction, addToCartAction };

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);

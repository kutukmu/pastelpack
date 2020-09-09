import React, { Component } from "react";
import {
  getProductDetailsAction,
  openPortal,
  addToCartAction,
} from "../Actions";
import Rating from "./rating";
import ReactImageMagnify from "react-image-magnify";
import { BsStar } from "react-icons/bs";
import { GiRamProfile } from "react-icons/gi";
import { connect } from "react-redux";
import ReviewModal from "../modals/review";

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false,
    };
  }
  componentDidMount() {
    this.props.getProductDetailsAction(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.addreview !== prevProps.addreview) {
      this.props.getProductDetailsAction(this.props.match.params.id);
    }
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
    } else {
      this.props.history.push("/signin");
    }
  };

  handlePortal = () => {
    const id = this.props.user._id;
    if (id) {
      this.props.openPortal();
    } else {
      this.props.history.push("/signin");
    }
  };

  renderDetails = () => {
    const { product } = this.props.productDetail;

    if (product) {
      return (
        <div className="product-container">
          <div className="product-image">
            <div className="img-container">
              <ReactImageMagnify
                enlargedImagePosition="over"
                {...{
                  smallImage: {
                    enlargedImagePosition: "over",
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: true,
                    src: product.image,
                  },
                  largeImage: {
                    src: product.image,
                    width: 1200,
                    height: 1800,
                  },
                }}
              />
            </div>
          </div>
          <div className="product-info">
            <div className="product-titles">
              <h4>{product.category}</h4>
              <h1>{product.name}</h1>
            </div>
            <div className="rating">
              <Rating rating={this.calcRating(product)} />(
              {product.reviews.length} <a href="#reviews">reviews</a>)
            </div>
            <div className="description">
              <p>{product.description}</p>
            </div>
            <div className="price">
              <h3> ${product.price}</h3>
            </div>

            <div className="action-buttons">
              <button
                className="action-btn"
                onClick={() => this.handleClick(product._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
          {this.props.portal.isOpen && (
            <ReviewModal
              name={this.props.user.name}
              id={this.props.match.params.id}
            />
          )}
        </div>
      );
    }
  };

  renderComments = () => {
    const { product } = this.props.productDetail;

    if (product) {
      const arr = product.reviews.map((review, idx) => {
        return (
          <div className="user-comment" key={idx}>
            <div className="icon">
              <GiRamProfile />
            </div>
            <div className="comment-info">
              <div className="username">
                <h4>{review.name}</h4>
              </div>
              <div className="rating">
                <Rating rating={`${review.rating}`} />
              </div>
              <div className="date">
                <h5>{review.createdAt}</h5>
              </div>
              <div className="comment-text">
                <p>{review.comment}</p>
              </div>
            </div>
          </div>
        );
      });

      return <div className="comments">{arr}</div>;
    }
  };

  render() {
    const { product } = this.props.productDetail;
    return (
      <div className="product-detail">
        <div className="container">
          <div className="review-detail">
            <div className="detail-inner">{this.renderDetails()}</div>
            <div className="reviews-container" id="reviews">
              <div className="reviews-text">
                <div className="title">
                  <h2>Reviews ( {product ? product.reviews.length : 0} )</h2>
                  <button
                    className="action-btn"
                    onClick={() => this.handlePortal()}
                  >
                    Write Review{" "}
                  </button>
                </div>

                <div className="avg-rating">
                  <BsStar className="start-icon" />
                  <div className="num">
                    <h2>
                      {product ? this.calcRating(product) : 0} / <span>5</span>
                    </h2>
                    <h3>Average Rating</h3>
                  </div>
                </div>

                {this.renderComments()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productDetail: state.productDetail,
  user: state.signInUser,
  portal: state.portal,
  addreview: state.addreview,
});

const mapDispatchToProps = {
  getProductDetailsAction,
  openPortal,
  addToCartAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

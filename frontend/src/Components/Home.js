import React, { Component } from "react";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import { FeaturedProductAction, gsapAction } from "../Actions";
import gsap from "gsap";
import { connect } from "react-redux";
class Home extends Component {
  componentDidMount() {
    this.props.FeaturedProductAction();

    const { isHere } = this.props.gsapAnimation;
    if (!isHere) {
      let tl = gsap.timeline();
      tl.to(".home-layer h1", 2, {
        opacity: 0,
        y: -80,
        ease: "expo.inOut",
      })
        .to(".home-layer span", 1.5, {
          delay: -0.5,
          opacity: 0,
          y: -60,

          ease: "expo.inOut",
        })
        .to(".home-layer", 1.5, {
          delay: -0.5,
          top: "100%",

          ease: "expo.inOut",
        })
        .to(".home-layer", 0.5, {
          delay: 0,
          top: "100%",

          ease: "expo.inOut",
          css: {
            display: "none",
          },
        })
        .from(".info-wrapper", 0.7, {
          delay: 0,
          opacity: 0,
          y: -100,
          ease: "expo.inOut",
        })
        .from(".home-inner-images", 1.2, {
          delay: 0,
          opacity: 0,
          y: -100,
          ease: "expo.inOut",
        });
    } else {
      let tl2 = gsap.timeline();
      tl2.to(".home-layer", 0, {
        delay: 0,
        top: "100%",

        ease: "expo.inOut",
        css: {
          display: "none",
        },
      });
    }

    this.props.gsapAction();
  }

  handleClick = (id) => {
    this.props.history.push(`/item/${id}`);
  };

  render() {
    const { product } = this.props.featuredProduct;

    return (
      <div className="home">
        <div className="home-layer">
          <h1>Pastel Pack</h1>
          <span>Modern Tshirt Design</span>
        </div>
        <div className="container">
          <div className="home-inner">
            <div className="saver">
              <div className="home-inner-info">
                <div className="info-wrapper">
                  <h1>Keep On Coding</h1>
                  <p>
                    Clean and pure desing take center stage in this eye-cating
                    fit tshirt
                  </p>
                  <h3>$25</h3>
                  {product && (
                    <button
                      onClick={() => this.handleClick(product._id)}
                      className="add-cart-btn"
                    >
                      View More
                    </button>
                  )}
                </div>
              </div>

              <div className="home-inner-images">
                <img
                  src="../images/blob-gradient.png"
                  alt="blob-gradinet"
                  className="gradient-blob"
                />
                <img
                  src="../images/tshirt.png"
                  alt="tshirt"
                  className="tshirt"
                />
              </div>
            </div>

            <div className="home-social">
              <a href="/">
                <FiFacebook />
              </a>
              <a href="/">
                <FiTwitter />
              </a>
              <a href="/">
                <FiInstagram />
              </a>
            </div>
            <div className="absolute-images">
              <img
                src="../images/top.png"
                className="absolute-top"
                alt="blob"
              />
              <img
                src="../images/corner.png"
                className="absolute-corner"
                alt="blob"
              />
              <img
                src="../images/blob1.png"
                className="image-blob1"
                alt="blob"
              />
              <img
                src="../images/blob2.png"
                className="image-blob2"
                alt="blob"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const getState = (state) => {
  return {
    user: state.signInUser,
    featuredProduct: state.featuredProduct,
    gsapAnimation: state.gsapAnimation,
  };
};

export default connect(getState, { FeaturedProductAction, gsapAction })(Home);

import React from "react";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

import { Link } from "react-router-dom";

const footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="left-footer">
            <h2>Pastel Pack</h2>
            <div className="social-icons">
              <FiFacebook className="icon" />
              <FiTwitter className="icon" />
              <FiInstagram className="icon" />
            </div>

            <div className="reserved">
              <h3>&copy; 2020. All Rights Reserved</h3>
            </div>
          </div>

          <div className="mid-footer">
            <h2>Main Pages</h2>

            <div className="links">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div className="right-footer">
            <h2>Policy</h2>

            <div className="links">
              <Link to="/returnpolicy">Return Policy</Link>
              <Link to="/faq">Faq</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default footer;

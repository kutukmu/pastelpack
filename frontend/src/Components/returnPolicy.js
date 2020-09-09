import React from "react";
import Footer from "./footer";
const returnPolicy = () => {
  return (
    <div className="policy-footer">
      <div className="returnpolicy">
        <div className="container">
          <div className="inner-policy">
            <div className="policy-info">
              <h1>Return Policy</h1>

              <div className="first-policy">
                <h2>What’s your return policy?</h2>
                <p>
                  We don’t offer returns and exchanges, but if there’s something
                  wrong with your order, please let us know by contacting us.
                </p>
              </div>

              <div className="second-policy">
                <h2>Do you offer refunds?</h2>
                <p>
                  Refunds are only offered to customers that receive the wrong
                  items or damaged items. If any of these apply, please contact
                  us at pastelpack0@gmail.com with photos of wrong/damaged items
                  and we’ll sort that out for you. Accepted refunds may take up
                  to 10 business days to be returned back to your card.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default returnPolicy;

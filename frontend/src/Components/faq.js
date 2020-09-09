import React from "react";
import Footer from "./footer";
function Faq() {
  return (
    <div className="policy-footer">
      <div className="returnpolicy">
        <div className="container">
          <div className="inner-policy">
            <div className="policy-info">
              <h1>FAQs</h1>

              <div className="first-policy">
                <h2>Can I return my order?</h2>
                <p>
                  Unfortunately we don't offer returns, since everything is
                  printed on demand. However, if there's an issue with your
                  order, please contact me so I can make it right!
                </p>
              </div>

              <div className="first-policy">
                <h2>Do you offer refunds?</h2>
                <p>
                  Refunds are only offered to customers that receive the wrong
                  items or damaged items. If any of these apply, please contact
                  us at pastelpack0@gmail.com with photos of wrong/damaged items
                  and we’ll sort that out for you. Accepted refunds may take up
                  to 10 business days to be returned back to your card.
                </p>
              </div>

              <div className="first-policy">
                <h2>I have a question about my order, what should I do?</h2>
                <p>Contact me! I'd be happy to help out.</p>
              </div>

              <div className="first-policy">
                <h2>How long will it take to get my order?</h2>
                <p>
                  It'll vary! (Sorry, I know how much everyone hates "it
                  depends", but it depends.). Due to COVID, there is a slight
                  delay on apparel printing within the US - 4-9 business days
                </p>
              </div>

              <div className="first-policy">
                <h2>Do you print all of these products yourself?</h2>
                <p>
                  For right now I don't, but I am planning to print products
                  myself.
                </p>
              </div>

              <div className="first-policy">
                <h2>How did you build this store?</h2>
                <p>
                  My main stack is React, Redux, Mongodb, Express and Nodejs.
                  And then there are a lots of other libraries that I have used
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Faq;

import React from "react";

export default function steps({ step1, step2, step3, step4 }) {
  return (
    <div className="steps">
      <div className={`step signin ${step1 ? "orange" : null}`}>
        <h4>Sign In</h4>
      </div>
      <div className={`step shipping ${step2 ? "orange" : null}`}>
        <h4>Shipping</h4>
      </div>
      <div className={`step payment ${step3 ? "orange" : null}`}>
        <h4>Payment</h4>
      </div>
      <div className={`step placeorder ${step4 ? "orange" : null}`}>
        <h4>Place Order</h4>
      </div>
    </div>
  );
}

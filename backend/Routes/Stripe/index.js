import express from "express";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
let Route = express.Router();

// This is your real test secret API key.
const stripe = new Stripe(
  "sk_test_51HHhV8Atw8ZjzTv8R3LlJm46WFEPPF9qTwX4U79yeS4OVDZ23ZpBe4vdIWQstOISPEyAWzSZvyHwkdttb0hklooF00jZEqF8jw"
);
const calcAmount = (items) => {
  const calcSub = () => {
    return items.reduce((a, c) => a + c.qty * c.price, 0);
  };

  const calcTax = () => {
    let x = Number((calcSub() * 0.0625).toFixed(2));

    return x;
  };

  const calcShipping = () => {
    let total = calcSub();

    if (total > 100) {
      return 0;
    } else {
      return 5;
    }
  };

  const calcTotal = () => {
    const total = calcShipping() + calcSub() + calcTax();

    return total;
  };

  return calcTotal() * 100;
};

Route.post("/charge", async (req, res) => {
  let error;
  let status;
  try {
    const { items, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotencyKey = uuidv4();

    const charge = await stripe.charges.create(
      {
        amount: calcAmount(items),
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the tshirt `,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencyKey,
      }
    );

    res.status(200).send({ message: "Payment success", status: "success" });
  } catch (error) {
    res.status(400).send({ message: "Payment success", status: "failure" });
  }
});

export default Route;

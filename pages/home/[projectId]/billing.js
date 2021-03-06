import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HBP9kDQhgR0DqOco3oVW0DDGy35O84fyThdmVhPPGVRWhOi3IqYBnXB5vHZXU6WYx8OB78mqjTYBDXyLXxk4HkQ00Tylq8uhC"
);

const Billing = (props) => {
  const [product, setProduct] = useState({
    name: "Tesla",
    price: 643,
    description: "cool car",
  });

  return (
    <div>
      <h1>Billing Page</h1>
      <h3>{product.name}</h3>
      <h4>${product.price}</h4>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};
export default Billing;

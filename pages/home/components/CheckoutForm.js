import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.css";

const CheckoutForm = (props) => {
  // const stripe = useStripe();
  // const elements = useElements();

  // const handleSubmit = async (event) => {
  //   // Block native form submission.
  //   event.preventDefault();

  //   if (!stripe || !elements) {
  //     // Stripe.js has not yet loaded.
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return;
  //   }

  //   const result = await stripe.confirmCardPayment(
  //     "pi_1HBh6FDQhgR0DqOcfdoApSoD_secret_FObjJl68e64ey6YL5nQ58w6A6",
  //     {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //         billing_details: {
  //           name: "Jenny Rosen",
  //         },
  //       },
  //     }
  //   );

  //   if (result.error) {
  //     // Show error to your customer (e.g., insufficient funds)
  //     console.log(result.error.message);
  //   } else {
  //     // The payment has been processed!
  //     if (result.paymentIntent.status === "succeeded") {
  //       console.log("success");
  //     }
  //   }
  // };
  // const CARD_ELEMENT_OPTIONS = {
  //   style: {
  //     base: {
  //       height: "40px",
  //       padding: "10px 12px",
  //       width: "50%",
  //       color: "#32325d",
  //       backgroundColor: "white",
  //       border: "1px solid transparent",
  //       borderRadius: " 4px",

  //       boxShadow: " 0 1px 3px 0 #e6ebf1",
  //       "-webkit-transition": "box-shadow 150ms ease",
  //       transition: "box-shadow 150ms ease",
  //     },
  //   },
  //   invalid: {
  //     color: "#fa755a",
  //     iconColor: "#fa755a",
  //   },
  // };

  return (
    <div>
      {/* <form className={styles.FormGroup} onSubmit={handleSubmit}>
        <CardElement
          shippingAddress
          className={styles.StripeElement}
          options={CARD_ELEMENT_OPTIONS}
        />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form> */}
    </div>
  );
};

export default CheckoutForm;

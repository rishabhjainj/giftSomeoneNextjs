import { render } from "react-dom";
import useAuth from "../../../../auth/authContext";
import { useState, useEffect } from "react";

import styles from "./CartComponent.module.css";
function createMarkup(data) {
  return { __html: data };
}
const PaymentComponent = (props) => {
  const data = props.data;
  return <div dangerouslySetInnerHTML={createMarkup(data)} />;
};
export default PaymentComponent;

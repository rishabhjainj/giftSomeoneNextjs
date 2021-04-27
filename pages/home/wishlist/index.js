import React from "react";
import { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import BaseTemplate from "../components/BaseTemplate";
import WishlistComponent from "./components/WishlistComponent";
import TitleFragment from "../../TitleFragment";
import dynamic from "next/dynamic";
import useAuth from "../../../auth/authContext";
import Wishlist from "./components/WishlistComponent";
const Index = () => {
  const { getProductById, getCart } = useAuth();
  const router = useRouter();
  const { productId } = router.query;
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState({});
  useEffect(() => {
    const response = getCart(1);
    response.then(function (value) {
      console.log(value);
      setLoading(false);
      setCartData(value);
    });
  }, [getCart]);

  return (
    <TitleFragment title="Your Cart">
      <BaseTemplate
        content={
          <div>
            <WishlistComponent loading={loading} />
          </div>
        }
      />
    </TitleFragment>
  );
};

export default Index;

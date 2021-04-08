import React from "react";
import {useEffect, useState} from "react";
import { useRouter, withRouter } from "next/router";
import BaseTemplate from "../components/BaseTemplate";
import CartComponent from "./components/CartComponent";
import TitleFragment from "../../TitleFragment";
import dynamic from "next/dynamic";
import useAuth from "../../../auth/authContext"
const Index = () => {
    const {getProductById, getCart} = useAuth();
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
              <CartComponent cartData={cartData} loading={loading} />
            </div>
          }
        />
      </TitleFragment>
    );
  };
  
  export default Index;
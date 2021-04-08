import { useRouter, withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BaseTemplate from "./components/BaseTemplate";
import dynamic from "next/dynamic";
import useAuth from "../../auth/authContext";

import TitleFragment from "../TitleFragment";
const HomeComponent = dynamic(() => import("./components/HomeComponent"), {
  ssr: false,
});
// import HomeComponent from "../components/HomeComponent";

const Index = () => {
  const { getProductList, getCategories } = useAuth();
  const router = useRouter();
  const [productList, setProductList] = useState({});
  const [categoryList, setCategoryList] = useState({});

  useEffect(()=>{
    const categoryResponse = getCategories();
    categoryResponse.then((value)=>{
      if(value!=null)
        setCategoryList(value);
    });
  }, [getCategories]);

  useEffect(()=>{
    const response = getProductList();
    response.then((value)=>{
        if(value!=null)
          setProductList(value);
    });
  },[getProductList]);


  return (
    <TitleFragment title="Home">
      <BaseTemplate
        content={<HomeComponent categories = {categoryList} products={productList} />}
      />
    </TitleFragment>
  );
};

export default Index;

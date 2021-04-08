import React from "react";
import {useEffect, useState} from "react";
import { useRouter, withRouter } from "next/router";
import BaseTemplate from "../components/BaseTemplate";
import SettingsComponent from "./components/SettingsComponent";
import TitleFragment from "../../TitleFragment";
import dynamic from "next/dynamic";
import useAuth from "../../../auth/authContext"
const Index = () => {
    const {getProductById} = useAuth();
    const router = useRouter();
    const { productId } = router.query;
    const [loading, setLoading] = useState(true);
    const [productData, setProjectData] = useState({});
    useEffect(() => {
        const response = getProductById(productId);
        response.then(function (value) {
            console.log(value);
            setLoading(false);
            setProjectData(value);
        });
      }, [getProductById]);
    
    return (
        <TitleFragment title="APIKeyTable">
        <BaseTemplate
        
          content={
            <div>
              <SettingsComponent productData={productData} loading={loading} />
            </div>
          }
        />
      </TitleFragment>
    );
  };
  
  export default Index;
import { Row, Col, Card, Tooltip, Divider, notification,Carousel } from "antd";
import Link from "next/link";
import styles from "./HomeComponent.module.css";
import useAuth from "../../../auth/authContext";
import React, { useState, useEffect } from "react";
import UsageCard from "./UsageCard";
import {
  SettingOutlined,
  AppstoreAddOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

const HomeComponent = (props) => {


  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

 
  return (
    <div>
      <div>
        <Carousel autoplay>
          
          <div className="home">
            <div className="home__container">
              <img
                className="home__image"
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
          <div className="home__container">
              <img
                className="home__image"
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
          <div className="home__container">
              <img
                className="home__image"
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                alt=""
              />
            </div>
          </div>
          <div>
          <div className="home__container">
              <img
                className="home__image"
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                alt=""
              />
            </div>
          </div>
      </Carousel>
      </div>
   </div>
  );
};
export default HomeComponent;

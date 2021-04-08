import { Row, Col, Card, Tooltip, Divider, notification,Carousel, Rate,Tag } from "antd";
import Link from "next/link";
import styles from "./HomeComponent.module.css";
import useAuth from "../../../auth/authContext";
import React, { useState, useEffect } from "react";
const {Meta}=Card;
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
  const categories = props? props.categories: null;
  const products = props ? props.products : null;

  const categoryList = categories.results;
  const productList = products.results;

  const gutters = {};
  const vgutters ={};
  const colCounts = {};

  [8, 16, 24, 32, 40, 48].forEach((value, i) => {
    gutters[i] = value;
  });
  [8, 16, 24, 32, 40, 48].forEach((value, i) => {
    vgutters[i] = value;
  });
  [2, 3, 4, 6, 8, 12].forEach((value, i) => {
    colCounts[i] = value;
  });

  const [gutterKey, setGutterKey] = useState(2);
  const [vgutterKey, setVGutterKey] = useState(2);
  const [colCountKey, setColCountKey] = useState(2);

  const onGutterChange = (value) =>{
    setGutterKey(value);
  };
  const onVGutterChange = (value) => {
    setVGutterKey(value);
  };
  const onColCountChange = (value) => {
    setColCountKey(value);
  };

  const cols = [];
  const col1 = [];

  const colCount = categoryList ? categoryList.length : 0;
  const prodCount = productList ? productList.length : 0;
  let colCode = "";
  let i=0;
  let j=0;

  let categoryCards = [];
  let productCards = [];

  function getDiscountPrice(price, discount){
    let newprice = price - (price*discount/100);
    return newprice;
  }
  for(i=0; i< prodCount;i++){
    console.log(i);
    const link = "/home/".concat(productList[i].id);
    productCards.push(
      <Link href={link}>
        <Col
          className={styles.column}
          xs={24}
          sm={12}
          md={12}
          lg={8}
          xl={4}
          key={i.toString()}
          span={24 / 6}
        >
          <Card
            hoverable
            className={styles.card}

            title={<b>{productList[i].label?<Tag color="green">{productList[i].label.name}</Tag> :null}</b>}
            cover={
              
              <center>
                <img
                  className={styles.image}
                  alt="icon"
                  src={productList[i].image}
                />
              </center>
            }
          >
            <Meta title={productList[i].title} 
            />
            <div>
              <Tag color="gold">{productList[i].category.name}</Tag>
              <div>
                <div className={styles.price_wrapper}>
                  <Row>
                    <div className={styles.price_slash}></div>
                    <div className={styles.price}>$100</div>
                  </Row>
                </div>
                <div className={styles.additional}>
                  <p className={styles.price}>{"Offer Price : ₹" +getDiscountPrice(productList[i].price, productList[i].discount)}</p>
                </div>
                <Rate disabled defaultValue={4} />
              
              </div>
            </div>
            
          </Card>
        </Col>
      </Link>
    )
  }
  

  for(i=0;i < colCount; i++){
    categoryCards.push(
      <Col
          className={styles.column}
          xs={24}
          sm={12}
          md={12}
          lg={8}
          xl={4}
          key={i.toString()}
          span={24 / 6}
        >
          <Card
            hoverable
            className={styles.card}
            title={<b>{categoryList[i].name}</b>}
            cover={
              <center>
                <img
                  className={styles.image}
                  alt="icon"
                  src="/images/service.png"
                />
              </center>
            }
          >
          </Card>
        </Col>
    );
  }
  if (colCount == 0) {
    return (
      <div>
        <div className={styles.topBar}>
          <Row style={{ paddingLeft: "10px", paddingTop: "10px" }}>
            <h2>
              <b>Project Overview</b>
            </h2>
          </Row>
          <Divider />
          
        </div>
        <Divider style={{ borderTop: "1px solid white" }} />

        <div style={{ marginTop: "10px", padding: "20px" }}>
          <Row className={styles.row}>
            <h4>My Services</h4>
            <h4 style={{ paddingLeft: "10px" }}>{colCount}</h4>
          </Row>
          <Row>
            <center>
              <img alt="icon" src="/images/empty.png" />
            </center>
          </Row>
          <Row>
            <center>
              <h2>Please try refreshing page.</h2>
            </center>
          </Row>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Carousel autoplay style={{maxHeight:"300px"}}>
          
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
    <Card style={{marginTop:"50px"}}>
      <div>
        <div >
          <Row style={{ paddingLeft: "10px", paddingTop: "10px" }}>
            <h2>
              <b>Featured Categories</b>
            </h2>
          </Row>
        </div>
       
        <Row style={{ paddingLeft: "10px" }}>
          {categoryCards}
        </Row>
      </div>
    </Card>
    <Card style={{marginTop:"50px"}}>
      <div>
        <div >
          <Row style={{ paddingLeft: "10px", paddingTop: "10px" }}>
            <center>
              <h2>
                <b>Popular Right Now</b>
              </h2>
            </center>
          </Row>
        </div>
       
        <Row style={{ paddingLeft: "10px" }}>
          {productCards}
        </Row>
      </div>
    </Card>


    </div>

  );
};
export default HomeComponent;

import { Row, Col, Card, Tooltip, Divider, notification,Carousel } from "antd";
import Link from "next/link";
import styles from "./HomeComponent.module.css";
import useAuth from "../../../auth/authContext";
import React, { useState, useEffect } from "react";

import {
  SettingOutlined,
  AppstoreAddOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";


const curday = (sp) => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //As January is 0.
  let yyyy = today.getFullYear();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return yyyy + sp + mm + sp + dd;
};

const CartComponent = (props) => {
  const { getUsageByPoints } = useAuth();
  const [enabledServices, setEnabledServices] = useState([]);
  const [showContent, setShowContent] = useState(false);


  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };


 


//   useEffect(() => {
//     const hourlyUsage = getUsageByPoints(
//       curday("-").concat(" 00:00:01"),
//       curday("-").concat(" 23:59:59"),
//       "hourly",
//       projectId
//     );
//     hourlyUsage.then(function (value) {
//       setEnabledServices(value.is_enabled);
//     });
//   }, [getUsageByPoints]);

  const projectData = props ? props.services : null;
  const data = projectData ? projectData.services : null;
  const router = useRouter();
  const { projectId } = router.query;

  const gutters = {};
  const vgutters = {};
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

  const onGutterChange = (value) => {
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

  const colCount = data ? data.length : 0;
  let colCode = "";
  let i = 0;
  let j = 0;

  // cols.push(
  //     <Col onClick={props.handler} className={styles.column} key={i.toString()} span={(24 / 4)}>
  //         <
  // colCount; i++) {
  

  if (colCount == 0) {
    return (
      <div>
        <div className={styles.topBar}>
          <Row style={{ paddingLeft: "10px", paddingTop: "10px" }}>
            <h2>
              <b>Your Cart</b>
            </h2>
          </Row>
          <Divider />
          <Row style={{ paddingLeft: "10px" }}>
            <h5>{projectData ? projectData.description : ""}</h5>
          </Row>
        </div>
        <Divider style={{ borderTop: "1px solid white" }} />

        <div style={{ marginTop: "10px", padding: "20px" }}>
            <Row className={styles.row}>
              <h4>Items In Cart</h4>
              <h4 style={{ paddingLeft: "10px" }}>{colCount}</h4>
            </Row>
          <Row>
              <Row>
                <center>
                  <img style={{maxHeight:"100px"}} alt="icon" src="/images/empty.png" />
                </center>
              </Row>
              <Row style={{marginTop:"25px"}}>
                <center>
                  <h2>No products in cart yet! Browse products from left bar.</h2>
                </center>
              </Row>
          </Row>
        </div>
      </div>
    );
  }
  const openNotification = (placement) => {
    notification.open({
      message: "Coming Soon!",
      description: "This feature is coming soon!",
      placement,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  return (
    <div>
      <div className={styles.topBar}>
        <Row style={{ paddingLeft: "10px", paddingTop: "10px" }}>
          <h2>
            <b>Your Cart</b>
          </h2>
        </Row>
        <Divider />
        <Row style={{ paddingLeft: "10px" }}>
          <h5>{projectData.description}</h5>
        </Row>
      </div>
      <div className={styles.topBar} style={{ marginTop: "100px" }}>
        <Row style={{ paddingLeft: "10px", paddingTop: "10px" }}>
          <Col span={8} gutter={8} style={{ padding: "10px" }}>
            <Card
              hoverable
              className={styles.sections}
              onClick={() => {
                if (showContent) {
                  setShowContent(false);
                } else {
                  setShowContent(true);
                }
                console.log(showContent);
              }}
            >
              <center>
                <img src="/images/ic_sections.png" alt="my image" />
                <h2 style={{ color: "white" }}>Web APIs</h2>
              </center>
            </Card>
          </Col>
          <Col span={8} gutter={8} style={{ padding: "10px" }}>
            <Card
              hoverable
              className={styles.sections}
              onClick={() => {
                openNotification("bottomLeft");
              }}
            >
              <center>
                <img src="/images/ic_sections.png" alt="my image" />
                <h2 style={{ color: "white" }}>Mobile SDKs</h2>
              </center>
            </Card>
          </Col>
          <Col span={8} gutter={8} style={{ padding: "10px" }}>
            <Card
              hoverable
              className={styles.sections}
              onClick={() => {
                openNotification("bottomLeft");
              }}
            >
              <center>
                <img src="/images/ic_sections.png" alt="my image" />
                <h2 style={{ color: "white" }}>Command Center</h2>
              </center>
            </Card>
          </Col>
        </Row>
      </div>
      <Divider style={{ borderTop: "1px solid white" }} />
      {showContent ? (
        <div style={{ marginTop: "10px", padding: "20px" }}>
          <Row className={styles.row}>
            <h4>Items in cart</h4>
            <h4 style={{ paddingLeft: "10px" }}>{colCount}</h4>
          </Row>
          <Row
            className={styles.row}
            gutter={[gutters[gutterKey], vgutters[vgutterKey]]}
          >
            {cols}
          </Row>
        </div>
      ) : null}
      {/* <UsageCard service="face_mask"></UsageCard> */}
      {showContent ? usageCards : null}
    </div>
  );
};
export default CartComponent;

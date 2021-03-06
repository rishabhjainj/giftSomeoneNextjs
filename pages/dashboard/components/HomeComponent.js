import { Row, Col, Card, Tooltip, Divider, notification } from "antd";
import Link from "next/link";
import styles from "./HomeComponent.module.css";
import useAuth from "../../../auth/authContext";
import React, { useState, useEffect } from "react";
import UsageCard from "./UsageCard";
// const UsageCard = dynamic(
//   () => import("./UsageCard"),
//   { ssr: false }
// );
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

const HomeComponent = (props) => {
  const { getUsageByPoints } = useAuth();
  const [enabledServices, setEnabledServices] = useState([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const hourlyUsage = getUsageByPoints(
      curday("-").concat(" 00:00:01"),
      curday("-").concat(" 23:59:59"),
      "hourly",
      projectId
    );
    hourlyUsage.then(function (value) {
      setEnabledServices(value.is_enabled);
    });
  }, [getUsageByPoints]);

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
  let usageCards = [];
  for (i = 0; i < enabledServices.length; i++) {
    usageCards.push(<UsageCard service={enabledServices[i]}></UsageCard>);
  }
  for (i = 0; i < colCount; i++) {
    cols.push(
      <Link
        href="/dashboard/[projectId]/services/[service]"
        as={`/dashboard/${projectId}/services/${data[i].id}`}
      >
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
            title={<b>{data[i].name}</b>}
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
            {data[i].description.substr(0, 30).concat("..")}
          </Card>
        </Col>
      </Link>
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
          <Row style={{ paddingLeft: "10px" }}>
            <h5>{projectData ? projectData.description : ""}</h5>
          </Row>
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
              <h2>No Services enabled yet! Browse services from left bar.</h2>
            </center>
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
            <b>Project Overview</b>
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
            <h4>My Services</h4>
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
export default HomeComponent;

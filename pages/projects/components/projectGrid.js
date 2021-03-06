import React, { useState, useEffect } from "react";
import { Button, Col, Row, Divider, Card } from "antd";
import QuestionOutlined from "@ant-design/icons";
import styles from "./projectGrid.module.css";
import Link from "next/link";
import {
  SettingOutlined,
  AppstoreAddOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

const ProjectGrid = (props) => {
  const gutters = {};
  const vgutters = {};
  const colCounts = {};

  useEffect(() => {
    setLoading(false);
  }, []);

  const projectList = props.projects;

  [8, 16, 24, 32, 40, 48].forEach((value, i) => {
    gutters[i] = value;
  });
  [8, 16, 24, 32, 40, 48].forEach((value, i) => {
    vgutters[i] = value;
  });
  [2, 3, 4, 6, 8, 12].forEach((value, i) => {
    colCounts[i] = value;
  });
  const [gutterKey, setGutterKey] = useState(1);
  const [vgutterKey, setVGutterKey] = useState(1);
  const [colCountKey, setColCountKey] = useState(2);

  const [loading, setLoading] = useState(true);

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
  const colCount = projectList ? projectList.length : 0;
  let colCode = "";
  let i = 0;
  let j = 0;

  cols.push(
    <Col
      xs={24}
      sm={12}
      md={12}
      lg={8}
      xl={4}
      onClick={props.handler}
      className={styles.column}
      key={i.toString()}
      span={24 / 4}
    >
      <Card hoverable className={styles.addCard}>
        <center>
          <AppstoreAddOutlined style={{ color: "#2db4ed", fontSize: "60px" }} />
          <h2 style={{ color: "#2db4ed" }}>Create New</h2>
        </center>
      </Card>
    </Col>
  );
  for (i = 0; i < colCount; i++) {
    const link = "/home/".concat(projectList[i].id);
    cols.push(
      <Link href={link}>
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={8}
          xl={4}
          className={styles.column}
          key={i.toString()}
          span={24 / 4}
        >
          <Card
            hoverable
            className={styles.card}
            title={projectList[i].name}
            cover={
              <center>
                <img
                  className={styles.image}
                  alt="icon"
                  src="/images/presentation.png"
                />
              </center>
            }
          >
            {projectList[i].description}
          </Card>
        </Col>
      </Link>
    );
  }
  // for (i = 0; i < colCount-4; i++) {
  //     col1.push(
  //         <Col className={styles.column} key={i.toString()} span={(24 / 4)}>
  //             <Card hoverable className={styles.card} title="Project Title">
  //
  //             </Card>
  //         </Col>,
  //     );
  //
  // }
  if (loading) {
    return null;
  }
  return (
    <div style={{ marginTop: "-100px", padding: "20px" }}>
      <Row
        className={styles.row}
        gutter={[gutters[gutterKey], vgutters[vgutterKey]]}
      >
        {cols}
      </Row>

      {/*<Row className={styles.row} gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>{col1}</Row>*/}
    </div>
  );
};

export default ProjectGrid;

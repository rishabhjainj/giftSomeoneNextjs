import React, { useState, useEffect } from "react";
import ProjectGrid from "./components/projectGrid";
import {
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  Radio,
  Dropdown,
  Badge,
  notification,
  Avatar,
  Tooltip,
  Menu,
} from "antd";
import { QuestionOutlined, UserOutlined,ShoppingCartOutlined } from "@ant-design/icons";

import useAuth, { ProtectRoute } from "../../auth/authContext";


const Project = () => {
  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  
 
  const menu = (
    <Menu>
      {/* <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          Account Settings
        </a>
      </Menu.Item> */}
      {/* <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="home/EnabledAPIs"
        >
          Enabled APIs
        </a>
      </Menu.Item> */}
      <Menu.Item
        onClick={() => {
          logout();
        }}
        danger
      >
        Sign Out
      </Menu.Item>
    </Menu>
  );

  const Header = () => {
    return (
    

      <Row style={{ padding: "15px 10px 10px 10px", background: "white" }}>
        <Col xs={0} sm={0} lg={14} xl={0} md={0}></Col>

        <Col xs={0} sm={0} lg={0} xl={18} md={4}>
          <img
            src="/images/logo.png"
            width="auto"
            style={{ background: "black" }}
            height="40px"
          />
        </Col>

        <Col xs={24} sm={24} lg={10} xl={6} md={20}>
          <Row>
            <Col xs={16} sm={18} md={18} lg={14} xl={11}>
              <span float={"left"} style={{ color: "#0c1b33" }}>
                <b>GiftSomeOne!</b>
              </span>
            </Col>

            <Col xs={8} sm={6} md={6} lg={10} xl={13}>
              <Dropdown overlay={menu}>
                <span style={{ marginLeft: "30px", marginTop: "30px" }}>
                  <Badge dot>
                    <Avatar shape="square" icon={<UserOutlined />} />
                  </Badge>
                </span>
              </Dropdown>
              <a href="mailto:admin@test.com">
                <Tooltip title="Cart">
                  <Button
                    type="primary"
                    style={{
                      align: "right",
                      marginLeft: "30px",
                      background: "black",
                      borderColor: "black",
                    }}
                    shape="circle"
                    icon={<ShoppingCartOutlined />}
                  />
                </Tooltip>
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  const showDialog = () => {
    setVisible(true);
  };

  const TopBar = () => {
    return (
      <Row
        style={{
          width: "100vw",
          height: "30vh",
          background: " #6f42c1",
          padding: "50px",
        }}
      >
        <Col>
          <h3 style={{ color: "white" }}>Hi User!</h3>
          <span style={{ color: "white", fontSize: "2.0em" }}>
            Try From Our Curated Categories
          </span>
        </Col>
      </Row>
    );
  };

  const { logout,} = useAuth();
  var categoryList = [ 'cat1',
  'cat2',
  'cat3',
  'cat4',

];
   

  return (
    <div style={{ background: "#e6ecf5", minHeight: "100vh" }}>
      <Header />
      <TopBar />
      <ProjectGrid handler={showDialog} projects={categoryList} />
    </div>
  );
};
export default Project;
//export default ProtectRoute(Project);

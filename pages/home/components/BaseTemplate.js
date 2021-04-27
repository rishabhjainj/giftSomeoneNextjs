import Link from "next/link";
import AddProject from "./AddProject";
import { withRouter } from "next/router";
import useAuth from "../../../auth/authContext";
import Router from "next/router";
import styles from "./BaseTemplate.module.css";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import {
  Button,
  Badge,
  Avatar,
  Tooltip,
  Row,
  Col,
  Upload,
  message,
  Icon,
  Dropdown,
  Breadcrumb,
  Spin,
  Input,
  Card,
  Layout,
  Menu,
  notification,
  Divider,
} from "antd";
import {
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  QuestionOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  SettingFilled,
  BranchesOutlined,
  KeyOutlined,
  MoneyCollectOutlined,
  SettingOutlined,
  ApiOutlined,
  DownOutlined,
  ProjectOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

const BaseTemplate = (props) => {
  const router = useRouter();
  const { projectId } = router.query;
  const { logout, isAuthenticated, getCategories } = useAuth();
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);

  const data = props.projectData;
  const list = props.selected;

  useEffect(() => {
    setLoading(false);
    if (!isAuthenticated) Router.push("/login/login-page/");
    else {
      const response = getCategories();
      response.then((value) => {
        setCategories(value);
      });
    }
  }, [logout, isAuthenticated]);

  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Link href="/home/settings" as={`/home/settings`}>
          Account Settings
        </Link>
      </Menu.Item>
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

  const NavMenu = (props) => {
    const categoriesData = props ? props.data : null;
    const categories = categoriesData ? categoriesData.results : null;

    let menu = [];
    let menuList = [];
    let subMenu = [];
    let subMenuList = [];
    let i = 0;
    let j = 0;
    let subMenuKeyList = [];
    if (categories)
      for (i = 0; i < categories.length; i++) {
        menu.push(
          <Menu.Item key={i.toString()} icon={<BranchesOutlined />}>
            {categories[i].name}
          </Menu.Item>
        );
      }

    return (
      <Menu
        theme="dark"
        defaultSelectedKeys={list}
        defaultOpenKeys={subMenuKeyList}
        mode="inline"
      >
        <Menu.ItemGroup
          key="g1"
          title={
            <>
              <ProjectOutlined />

              <span style={{ paddingLeft: "10px" }}>
                {data ? <b>{data.name}</b> : ""}
              </span>
            </>
          }
        >
          <Menu.Item key="1" icon={<BranchesOutlined />}>
            <Link href={"/home/"}>Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<KeyOutlined />}>
            <Link href={"/home/wishlist"}>WishList</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            <Link href={"/home/cart"}>Cart</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<MoneyCollectOutlined />}>
            Billing
          </Menu.Item>
        </Menu.ItemGroup>
        <Divider style={{ "background-color": "blue" }} />
        <Menu.ItemGroup key="5" title="Categories">
          {menu}
        </Menu.ItemGroup>
      </Menu>
    );
  };

  if (loading) {
    return null;
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          overflow: "auto",
          zIndex: 1,
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className={styles.logo}>
          <img
            src="/images/logo.png"
            width="auto"
            height="50px"
            style={{
              paddingBottom: "5px",
            }}
          />
        </div>
        <NavMenu data={categories} />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header
          className="site-layout-background"
          style={{ padding: "0 10px 10px 10px", background: "white" }}
        >
          <Row style={{ padding: "0 10px 10px 10px", display: "flex" }}>
            <Col xs={0} sm={0} lg={14} xl={0} md={0}>
              {" "}
            </Col>

            <Col xs={0} sm={0} lg={0} xl={18} md={4}>
              <span
                float={"left"}
                style={{
                  fontSize: "15px",
                  color: "white",
                  background: "#ffad33",
                  padding: "10px",
                }}
              >
                <Link href="/" as={`/`}>
                  All Categories
                </Link>
              </span>
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

                  <Link href={"/home/cart"}>
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
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>

        <Content style={{ margin: "24px 16px 0" }}>{props.content}</Content>
        <Footer style={{ textAlign: "center" }}>GiftSomeOne ©2021</Footer>
      </Layout>
    </Layout>
  );
};

export default BaseTemplate;

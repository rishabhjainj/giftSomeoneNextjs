import axios from "axios";
import { Alert, notification } from "antd";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button, Row, Col, Card, Upload, Input, message, Spin } from "antd";
import Icon, { DownloadOutlined, LoginOutlined } from "@ant-design/icons";
import useAuth from "../../../auth/authContext";
import styles from "./LoginTest.module.css";
import api from "../../../services/apiClient";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import Router from "next/router";

const antIcon = (
  <Icon type="loading" style={{ fontSize: 24, color: "white" }} spin />
);

const loginEndpoint = "login/";

const LoginComponent = () => {
  const stopRecord = null;
  const { login, logout, isAuthenticated, getProjects } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) window.location.pathname = "/";
  }, [logout, isAuthenticated]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const handleSignin = () => {
    setLoggingIn(true);

    const token = login(username, password);
    token.then(function (value) {
      console.log(value);
      if (value.token == "error") openErrorNotification();
      else if (value.token) {
        openNotification();
      }

      setLoggingIn(false);
    });

    const openNotification = () => {
      notification.open({
        type: "success",
        message: "Logged In Successfully!",
        description: "Welcome to GiftSomeone.",
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    };
  };
  const openErrorNotification = () => {
    notification.open({
      type: "error",
      message: "Incorrect Credentials!",
      description: "Try again with correct Username and Password combination.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  const handleClick = (e) => {
    console.log("clicked");
  };

  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };
  const onUsernameChanged = (e) => {
    setUsername(e.target.value);
  };

  //handle sign in ends

  return (
    <Spin spinning={loggingIn}>
      <div className={styles.myDiv}>
        <div className="container" style={{ height: "100vh" }}>
          <Row align="middle" style={{ height: "100vh" }}>
            <Col
              xs={24}
              sm={24}
              md={{ span: 8, offset: 8 }}
              lg={{ span: 8, offset: 8 }}
              style={{ marginTop: 0 }}
            >
              <h1
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: "40px",
                }}
              >
                <Row align="center">
                  <Link href="/">
                    <a>
                      <img
                        width="250px"
                        height="80px"
                        src={"/images/logo.png"}
                        alt={"logo"}
                        className="thumbnail"
                        style={{ marginBottom: "40px" }}
                      />
                    </a>
                  </Link>
                </Row>
                Login Here
              </h1>
              <h3
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "20px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              >
                You need to login before browsing. Psst! It's free.
              </h3>
              <div
                style={{
                  textAlign: "left",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              >
                <Input
                  id="username"
                  placeholder="Username"
                  value={username}
                  size="large"
                  onChange={onUsernameChanged}
                />
              </div>
              <br />
              <div
                style={{
                  textAlign: "left",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
              >
                <Input.Password
                  id="password"
                  placeholder="Password"
                  onChange={onPasswordChanged}
                  size="large"
                />
              </div>
              <Row align="center">
                <Button
                  onClick={handleSignin}
                  type="primary"
                  shape="round"
                  icon={<LoginOutlined />}
                  size={"large"}
                  style={{
                    textAlign: "center",
                    width: "170px",
                    height: "100%",
                    backcoground: "black",
                    borderColor: "black",
                    backgroundColor: "black",
                    padding: "10px 0 10px 0",
                    marginTop: 50,
                  }}
                >
                  Login
                </Button>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </Spin>
  );
};

export default LoginComponent;

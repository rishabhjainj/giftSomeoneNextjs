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
import { QuestionOutlined, UserOutlined } from "@ant-design/icons";

import useAuth, { ProtectRoute } from "../../auth/authContext";

const CreateProjectForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const openNotification = (placement) => {
    notification.open({
      type: "success",
      message: "Success!",
      description: "Project created successfully!",
      placement,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="title"
          label="Project Title"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Project Description"
          rules={[
            {
              required: true,
              message: "Please provide a description for your project",
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Project = () => {
  const [visible, setVisible] = useState(false);
  const [projectList, setProjectList] = useState({});
  const [loading, setLoading] = useState(true);
  const openNotification = (placement) => {
    notification.open({
      type: "success",
      message: "Success!",
      description: "Project created successfully!",
      placement,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  const onCreate = (values) => {
    console.log("Recieved values of form:", values);

    //call api here for submitting values on project create
    const response = addProject(values.title, values.description);
    response.then(function (value) {
      console.log(value);
      //Notification("success", "Success", "Project created successfully!");
      openNotification("topRight");
      //...............fetch project list again here...........
      const response = getProjects();
      response.then(function (value) {
        console.log(value);
        setProjectList(value);
      });
    });

    setVisible(false);
  };
  const menu = (
    <Menu>
      {/* <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          Project Settings
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
      // <Row
      //   style={{
      //     padding: "0 10px 10px 10px",
      //     display: "flex",
      //     background: "black",
      //     width: "100vw",
      //     height: "80px",
      //   }}
      // >
      //   <Col xs={4} sm={8} lg={8} xl={8} md={8}>
      //     <Row style={{ marginTop: "20px" }}>
      //       <img src="/images/logo.png" width="120px" height="40px" />
      //     </Row>
      //   </Col>
      //   <Col xs={0} sm={2} lg={4} xl={10} md={4}></Col>
      //   <Col xs={20} sm={14} lg={14} xl={6} md={12}>
      //     <Button
      //       type="primary"
      //       style={{
      //         align: "right",
      //         marginLeft: "40px",
      //         background: "black",
      //         borderColor: "black",
      //       }}
      //       shape="circle"
      //       icon={<QuestionOutlined />}
      //     />
      //   </Col>
      // </Row>

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
                <b>Try Recommender</b>
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
              <a href="mailto:admin@skylarklabs.ai">
                <Tooltip title="Help">
                  <Button
                    type="primary"
                    style={{
                      align: "right",
                      marginLeft: "30px",
                      background: "black",
                      borderColor: "black",
                    }}
                    shape="circle"
                    icon={<QuestionOutlined />}
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

  const { logout, getProjects, addProject } = useAuth();

  useEffect(() => {
    setLoading(false);
    const response = getProjects();
    response.then(function (value) {
      console.log(value);
      setProjectList(value);
    });
  }, [logout, getProjects]);

  if (loading) {
    return null;
  }
  return (
    <div style={{ background: "#e6ecf5", minHeight: "100vh" }}>
      <Header />
      <TopBar />
      <ProjectGrid handler={showDialog} projects={projectList} />

      <CreateProjectForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
export default Project;
//export default ProtectRoute(Project);

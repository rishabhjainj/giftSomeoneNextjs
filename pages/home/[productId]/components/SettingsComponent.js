import {
  PageHeader,
  Menu,
  Card,
  Skeleton,
  Form,
  Modal,
  notification,
  Input,
  Dropdown,
  Divider,
  Statistic,
  Button,
  Tag,
  Typography,
  Row,
} from "antd";
import { useRouter, withRouter } from "next/router";

import { EllipsisOutlined, ExclamationCircleOutlined , HeartTwoTone} from "@ant-design/icons";

import { render } from "react-dom";
import useAuth from "../../../../auth/authContext";
import { useState, useEffect } from "react";

import styles from "./SettingsComponent.module.css";

const { Paragraph } = Typography;



const Content = ({ children, extraContent }) => {
  return (
    <Row>
      <div style={{ flex: 1 }}>{children}</div>
      <div className={styles.image}>{extraContent}</div>
    </Row>
  );
};

const Settings = (props) => {
  const { deleteProject } = useAuth();
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setconfirmVisible] = useState(false);
  const data = props.productData;
  const date = data ? data.title : "";
  const category = data.category;
  const services = category ? category.name : null;
  const apis = data ? data.api_keys : null;
  const name = data ? data.title : null;
  const description = data ? data.description : null;
  const router = useRouter();
  const { projectId } = router.query;

  useEffect(() => {}, [deleteProject]);
  const addToCart = () => {
    
  };

  const ConfirmDialog = () => {
    return (
      <Modal
        title="Are you ABSOLUTELY sure?"
        visible={confirmVisible}
        onOk={onOk}
        onCancel={onCancel}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Do you want to continue deleting this project?</p>
      </Modal>
    );
  };
  const CreateProjectForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="Type name of Project to continue deletion"
        okText="Continue"
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
            name="name"
            label="Project Title"
            rules={[
              {
                required: true,
                message: "Type name of project to confirm!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  const openNotification = (placement) => {
    notification.open({
      type: "success",
      message: "Project Deleted!",
      description: "This project is now deleted!",
      placement,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  const openErrorNotification = () => {
    notification.open({
      type: "error",
      message: "Erorr!",
      description: "Project name is not correct.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  const onOk = () => {
    const response = deleteProject(projectId);
    response.then((value) => {
      console.log("deleted");
      openNotification("bottom-left");
      setconfirmVisible(false);
      setTimeout(() => {
        window.location.pathname = "/";
      }, 2000);
    });
  };
  const onCancel = () => {
    setconfirmVisible(false);
  };
  const onCreate = (values) => {
    if (values.name == name) {
      setVisible(false);
      setconfirmVisible(true);
    } else {
      openErrorNotification("top-right");
    }
  };

  return (
    <Card>
      <Skeleton loading={props.loading}>
        <PageHeader
          title={<h3 class={styles.heading}>{name}</h3>}
          className={styles.header}
          tags={<Tag color="blue">Available</Tag>}
          extra={[
            <Button key="1" type="danger" onClick={addToCart}>
              Add To Cart
            </Button>,
            <Button type="primary" icon={<HeartTwoTone twoToneColor="#eb2f96" />} size={8} >
              Add To Wishlist
            </Button>,
          ]}
          // breadcrumb={{ routes }}
        >
          <Content
            extraContent={
              <img src={data.image} alt="content" width="100%" />
            }
          >
            <Divider />
            <>
              <h3>Product Overview</h3>
              <Paragraph>{description}</Paragraph>

              <Row>
                <Row lg={24} style={{ marginTop: "50px" }}>
                  <Statistic
                    style={{ margin: "30px" }}
                    title="Created At:"
                    value={date}
                  />
                  <Statistic
                    style={{ margin: "30px" }}
                    title="Services Enabled"
                    value={services ? services.length : null}
                  />
                  <Statistic
                    style={{ margin: "30px" }}
                    title="API Keys Generated"
                    value={apis ? apis.length : null}
                  />
                </Row>
              </Row>
            </>
            <CreateProjectForm
              visible={visible}
              onCreate={onCreate}
              onCancel={() => {
                setVisible(false);
              }}
            />
            <ConfirmDialog />
          </Content>
        </PageHeader>
      </Skeleton>
    </Card>
  );
};
export default Settings;

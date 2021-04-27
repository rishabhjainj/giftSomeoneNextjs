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
  Col,
  Divider,
  Statistic,
  Button,
  Tag,
  Typography,
  Rate,
  Row,
} from "antd";
import { useRouter, withRouter } from "next/router";

import {
  EllipsisOutlined,
  ExclamationCircleOutlined,
  HeartTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";

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

function getDiscountPrice(price, discount) {
  let newprice = price - (price * discount) / 100;
  return newprice;
}

const Settings = (props) => {
  const { deleteProject, addToCart, addToWishlist } = useAuth();
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setconfirmVisible] = useState(false);
  const data = props.productData;
  const date = data ? data.title : "";
  const labelData = data ? data.label : null;
  const label = labelData ? labelData.name : "";
  const price = data ? data.price : null;
  const discount = data ? data.discount : null;
  const stock = data ? data.units_in_stock : null;
  const sale_price = getDiscountPrice(price, discount);
  const categoryData = data ? data.category : null;
  const category = categoryData ? categoryData.name : null;
  const apis = data ? data.api_keys : null;
  const name = data ? data.title : null;
  const description = data ? data.description : null;
  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {}, [deleteProject]);

  const addToCartClick = () => {
    addProductToCart();
  };
  const addProductToCart = () => {
    const response = addToCart(1, productId);
    response.then((value) => {
      console.log("deleted");
      openNotification(
        "bottom-left",
        "Product Added!",
        "Product is now in your cart"
      );
      setconfirmVisible(false);
      // setTimeout(() => {
      //   window.location.pathname = "/";
      // }, 2000);
    });
  };
  const addToWishlistClick = () => {
    addProductToWishlist();
  };
  const addProductToWishlist = () => {
    const response = addToWishlist(productId);
    response.then((value) => {
      console.log("deleted");
      openNotification(
        "bottom-left",
        "Product Added!",
        "Product is now in your wishlist"
      );
      setconfirmVisible(false);
      // setTimeout(() => {
      //   window.location.pathname = "/";
      // }, 2000);
    });
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
  const openNotification = (placement, msg, desc) => {
    notification.open({
      type: "success",
      message: msg,
      description: desc,
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
          tags={
            stock && stock > 0 ? (
              <Tag color="green">
                {" "}
                <CheckCircleTwoTone /> In Stock
              </Tag>
            ) : (
              <Tag color="red">Out Of Stock</Tag>
            )
          }
          extra={[
            <Button key="1" type="danger" onClick={addToCartClick}>
              Add To Cart
            </Button>,
            <Button
              type="primary"
              icon={<HeartTwoTone twoToneColor="#eb2f96" />}
              size={8}
              onClick={addToWishlistClick}
            >
              Add To Wishlist
            </Button>,
          ]}
          // breadcrumb={{ routes }}
        >
          <Divider />
          <>
            <Row>
              <Col lg={12}>
                {data ? (
                  <img src={data.image} alt="content" width="100%" />
                ) : null}
              </Col>

              <Col lg={2}></Col>

              <Col lg={10}>
                <div>
                  <Row>
                    <Statistic
                      style={{ fontStyle: "bold" }}
                      title="DealPrice"
                      prefix="₹"
                      value={sale_price}
                    />
                    <Statistic
                      style={{ marginLeft: "20px", color: "red" }}
                      title="Discount"
                      prefix=""
                      value={discount + "%"}
                    />
                  </Row>
                  <div className={styles.price_wrapper}>
                    <Row>
                      <div>M.R.P.{price}</div>
                    </Row>
                  </div>

                  <h2 style={{ marginTop: "30px" }}>Product Overview</h2>
                  <Rate disabled defaultValue={4} />
                  <Paragraph>{description}</Paragraph>
                </div>
              </Col>

              <Statistic
                style={{ margin: "30px" }}
                title="Product Price:"
                value={date}
              />
              <Statistic
                style={{ margin: "30px" }}
                title="Category"
                value={category ? category : null}
              />
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
        </PageHeader>
      </Skeleton>
    </Card>
  );
};
export default Settings;

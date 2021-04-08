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
import Link from "next/link";
import { useRouter, withRouter } from "next/router";
const { Meta } = Card;
import {
  EllipsisOutlined,
  ExclamationCircleOutlined,
  HeartTwoTone,
  CheckCircleTwoTone,
  MinusCircleOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { render } from "react-dom";
import useAuth from "../../../../auth/authContext";
import { useState, useEffect } from "react";

import styles from "./CartComponent.module.css";

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

const Cart = (props) => {
  const { deleteProject, addToCart, getCart, removeFromCart } = useAuth();

  const [data, setCartData] = useState({});

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [confirmVisible, setconfirmVisible] = useState(false);
  const [checkOutEnable, setCheckOutEnabled] = useState(false);

  const name = data ? data.title : null;

  const mCart = data && data.length > 0 ? data[0] : [];

  const products = mCart ? mCart.products : null;
  let len = products ? products.length : 0;

  useEffect(() => {
    updateCart();
  }, []);

  const updateCart = () => {
    const response = getCart(1);
    response.then(function (value) {
      setLoading(false);
      setCartData(value);
      if (value) {
        if (value.length > 0 && value[0].amount > 0) {
          setCheckOutEnabled(true);
        } else {
          setCheckOutEnabled(false);
        }
      }
    });
  };

  let cartCards = [];

  console.log("len is :" + len);
  let i = 0;
  for (i = 0; i < len; i++) {
    const product = products[i].product;
    const link = "/home/".concat(product.id);
    cartCards.push(
      <Col
        style={{ display: "block" }}
        className={styles.column}
        xs={24}
        sm={12}
        md={12}
        lg={24}
        xl={24}
        key={i.toString()}
      >
        <Card
          hoverable
          className={styles.card}
          // title={<b>{productList[i].label?<Tag color="green">{productList[i].label.name}</Tag> :null}</b>}
        >
          <Meta title={product.title} />
          <div>
            {/* <Tag color="gold">{productList[i].category.name}</Tag> */}
            <Row>
              <Link href={link}>
                <Col lg={12}>
                  <img
                    className={styles.image}
                    alt="icon"
                    src={"http://localhost:8002" + product.image}
                  />
                  <Rate disabled defaultValue={4} />
                </Col>
              </Link>
              <Col lg={6}></Col>
              <Col>
                <Row>
                  <div className={styles.price_wrapper}>
                    <Row>
                      <div>
                        <Row>
                          <Button
                            className={styles.btn}
                            icon={<PlusCircleOutlined />}
                            size={4}
                            onClick={() => addProductToCart(product.id, 1)}
                          ></Button>
                          <h2>QTY : {products[i].quantity}</h2>
                          <Button
                            className={styles.btn}
                            type="danger"
                            icon={<MinusCircleOutlined />}
                            size={4}
                            onClick={() => removeProduct(mCart.id, product.id)}
                          ></Button>
                        </Row>
                        <Button
                          className={styles.btn}
                          type="danger"
                          style={{ marginLeft: "10px" }}
                          icon={<DeleteOutlined />}
                          onClick={() => deleteItem(product.id, 0)}
                          size={4}
                        >
                          {" "}
                          DELETE
                        </Button>
                      </div>
                    </Row>
                  </div>
                </Row>
                <Row>
                  <div className={styles.additional}>
                    <p className={styles.price}>
                      {"Unit Price : ₹" +
                        getDiscountPrice(product.price, product.discount)}
                    </p>
                  </div>
                </Row>
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    );
  }

  useEffect(() => {}, [deleteProject]);

  const addToCartClick = () => {
    addProductToCart();
  };

  const addProductToCart = (id, qty) => {
    const response = addToCart(1, id, qty);
    response.then((value) => {
      console.log("deleted");
      if (qty == 0)
        openNotification(
          "bottom-left",
          "Item Deleted",
          "Product Removed From Cart"
        );

      setconfirmVisible(false);
      updateCart();
      // setTimeout(() => {
      //   window.location.pathname = "/";
      // }, 2000);
    });
  };

  const removeProduct = (cart_id, id) => {
    console.log("cartid" + cart_id);
    const response = removeFromCart(cart_id, id);
    response.then((value) => {
      console.log("deleted");

      setconfirmVisible(false);
      updateCart();
      // setTimeout(() => {
      //   window.location.pathname = "/";
      // }, 2000);
    });
  };
  const deleteItem = (id, qty) => {
    addProductToCart(id, 0);
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
    <div>
      <Card loading={loading}>
        <Row>
          <Col lg={20}>
            <div>
              <h2>Total Amount : {mCart.amount}</h2>
            </div>
          </Col>
          <Col>
            <div>
              {checkOutEnable ? (
                <Button type="primary" icon={<ShoppingCartOutlined />} size={4}>
                  CHECKOUT
                </Button>
              ) : (
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  size={4}
                  disabled
                >
                  CHECKOUT
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Card>
      <Card>
        <Col style={{ paddingLeft: "10px" }}>{cartCards}</Col>
      </Card>
    </div>
  );
};
export default Cart;

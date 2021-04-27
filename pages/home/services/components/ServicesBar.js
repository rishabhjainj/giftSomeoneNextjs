import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  notification,
  Card,
  Divider,
  PageHeader,
  Menu,
  Dropdown,
  Button,
  Tag,
  Typography,
} from "antd";
import useAuth from "../../../../auth/authContext";

const { Paragraph } = Typography;
import styles from "./ServiceBar.module.css";
import { EllipsisOutlined, ApiOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const ServicesBar = (props) => {
  const {
    getServiceById,
    enableService,
    serviceIsEnabled,
    disableService,
  } = useAuth();
  const router = useRouter();
  const { service, projectId } = router.query;
  const [serviceData, setServiceData] = useState({});
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const openNotification = (placement) => {
    notification.open({
      type: "success",
      message: "Enabled!",
      description: "This service is successfully enabled on this project!",
      placement,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  useEffect(() => {
    const response = getServiceById(service);
    response.then((value) => {
      setServiceData(value);
      console.log(value);
    });

    if (projectId != undefined) {
      console.log("service", service, "project", projectId);
      const isEnabled = serviceIsEnabled(service, projectId);
      isEnabled.then((value) => {
        setEnabled(value.enabled);
      });
    }
  }, [getServiceById, serviceIsEnabled]);

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          Social-Distancing
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          Humanitarian
        </a>
      </Menu.Item>
    </Menu>
  );
  const DropdownMenu = () => {
    return (
      <Dropdown key="more" overlay={menu}>
        <Button
          style={{
            border: "none",
            padding: 0,
          }}
        >
          <EllipsisOutlined
            style={{
              fontSize: 20,
              verticalAlign: "top",
            }}
          />
        </Button>
      </Dropdown>
    );
  };
  const Content = ({ children, extraContent }) => {
    return (
      <Row>
        <div style={{ flex: 1 }}>{children}</div>
        <div className={styles.image}>{extraContent}</div>
      </Row>
    );
  };
  const IconLink = ({ src, text }) => (
    <Row>
      <a className={styles.examplelink}>
        <Row>
          <img className={styles.examplelinkicon} src={src} alt={text} />
          {text}
        </Row>
      </a>
    </Row>
  );
  const routes = [
    {
      path: "index",
      breadcrumbName: "First-level Menu",
    },
    {
      path: "first",
      breadcrumbName: "Second-level Menu",
    },
    {
      path: "second",
      breadcrumbName: "Third-level Menu",
    },
  ];
  const content = (
    <>
      <Paragraph>{serviceData.description}</Paragraph>

      <div>
        <Row style={{ marginTop: "100px" }}>
          <Divider />
          <a target="_blank" href={serviceData.documentation_link}>
            <IconLink
              href={serviceData.documentation_link}
              src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
              text="Documentation"
            />
          </a>
          <IconLink
            src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
            text=" Pricing"
          />
        </Row>
      </div>
    </>
  );
  const enable = () => {
    setLoading(true);
    enableService(projectId, service);
    setTimeout(() => {
      setLoading(false);
      openNotification("bottomLeft");
      setEnabled(true);
    }, 3000);
  };
  const disable = () => {
    disableService(projectId, service);
    setEnabled(false);
  };
  return (
    <div>
      {serviceData.id ? (
        <Card>
          <PageHeader
            title={serviceData.name}
            className="site-page-header"
            subTitle=""
            tags={<Tag color="blue">{serviceData.category.name}</Tag>}
            extra={[
              !enabled ? (
                <Button
                  key="1"
                  type="primary"
                  loading={loading}
                  onClick={enable}
                >
                  ENABLE
                </Button>
              ) : (
                <Button key="2" onClick={disable}>
                  DISABLE
                </Button>
              ),

              <DropdownMenu key="more" />,
            ]}
            avatar={{ src: "/images/api.png" }}
          >
            <Divider />
            <Content
              extraContent={
                <img
                  className={styles.serviceimage}
                  src="/images/service_face_mask.png"
                  alt="content"
                />
              }
            >
              {content}
            </Content>
          </PageHeader>
        </Card>
      ) : null}
    </div>
  );
};
export default ServicesBar;

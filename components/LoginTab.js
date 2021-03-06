import { Tabs, Row, Col } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import LoginForm from "./LoginForm";
import styles from "./LoginTab.module.css";
const { TabPane } = Tabs;
export default class LoginTab extends React.Component {
  render() {
    return (
      <div className={styles.myDiv} style={{ marginTop: "100px" }}>
        <Row></Row>
        <Row>
          <Col xs={8} xl={8} md={8}></Col>
          <Col xs={8} xl={8} md={8}>
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span>
                    <AppleOutlined />
                    Login
                  </span>
                }
                key="1"
              >
                <LoginForm />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <AndroidOutlined />
                    SignUp
                  </span>
                }
                key="2"
              >
                Tab 2
              </TabPane>
            </Tabs>
          </Col>
          <Col xs={8} xl={8} md={8}></Col>
        </Row>
      </div>
    );
  }
}

import React, { useState } from "react";
import "./index.scss";
import { Layout, Menu, Row, Col, Dropdown } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/users";
import { sideMenuCollapse } from "../../store/slices/layout";
import Notification from "../Notifications/Notification";

const { Header: AntHeader, Content, Sider } = Layout;

function Header() {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const menuUser = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a onClick={() => dispatch(logout())}>
              <LogoutOutlined /> Salir
            </a>
          ),
        },
      ]}
    />
  );
  return (
    <AntHeader
      className="site-layout-background"
      style={{ padding: 0, paddingRight: 20 }}
    >
      <Row justify="space-between">
        <Col>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => dispatch(sideMenuCollapse()),
            }
          )}
        </Col>
        <Col>
          <div className={"right"}>
            {/* <Notification /> */}
            <Dropdown overlay={menuUser} placement="bottom">
              {/* <Button type="text" size="large"> */}
              <span className={"action account"}>
                <span style={{ color: "#1890ff" }}>
                  <UserOutlined />
                </span>{" "}
                <span className={"name"}>{user.username}</span>
              </span>
              {/* </Button> */}
            </Dropdown>
          </div>
        </Col>
      </Row>
    </AntHeader>
  );
}

export default Header;

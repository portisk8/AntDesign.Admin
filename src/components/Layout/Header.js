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
import ENV from "../../common/environment";
import Topnav from "./Topnav";

const { MENU } = ENV;
const { Header: AntHeader, Content, Sider } = Layout;

function Header() {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <AntHeader
      className={["site-layout-background", MENU.THEME, MENU.TYPE]}
      style={{ padding: 0, paddingRight: 20 }}
    >
      <Row justify="space-between">
        {MENU.TYPE?.toLocaleLowerCase() == "top" ? (
          <Col xs={6} sm={16} md={18} lg={20}>
            <Topnav />
          </Col>
        ) : (
          <Col>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => dispatch(sideMenuCollapse()),
              }
            )}
          </Col>
        )}

        <Col xs={18} sm={8} md={6} lg={4}>
          <div className={"right"}>
            {/* <Notification /> */}
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: (
                      <a onClick={() => dispatch(logout())}>
                        <LogoutOutlined /> Salir
                      </a>
                    ),
                  },
                ],
              }}
              placement="bottom"
            >
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

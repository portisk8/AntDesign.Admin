import React, { useEffect, useState } from "react";
import { Drawer, Dropdown, Image, Layout, Menu, Space } from "antd";
// import { items } from "./MenuItems";
import { useSelector } from "react-redux";
import { getMenuData } from "../../common/menu";
import { useNavigate } from "react-router-dom";
import { searchTree } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { setBreadcrumb, sideMenuCollapse } from "../../store/slices/layout";
import { useWindowSize } from "../../utils/Hooks/useWindowSize";
import CONFIG from "../../common/environment";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";

const { MENU, TITLE } = CONFIG;
const { Sider } = Layout;

function Topnav() {
  const { sideMenuCollapsed } = useSelector((state) => state.layout);
  const windowSize = useWindowSize();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = getMenuData();
  const [defaultSelectedKey, setDefaultSelectedKey] = useState(items[0].key);

  useEffect(() => {
    var pathNamesplitted = window.location.pathname.split("/");
    var lasPathKey = pathNamesplitted.pop();
    var node = searchTree(items, "key", lasPathKey);
    if (node) {
      setDefaultSelectedKey(node.key);
    }
  }, []);

  const onClickMenu = (e) => {
    console.log(e);
    var node = searchTree(items, "key", e.key);
    if (node) {
      if (windowSize.width < 768 && sideMenuCollapsed)
        dispatch(sideMenuCollapse());
      dispatch(setBreadcrumb(node.breadcrumb));
      navigate(node.path);
    }
  };
  return (
    <div>
      {windowSize.width > 768 && (
        <div>
          <div
            style={{
              float: "left",
              //   width: 120,
              //   margin: "16px 24px 16px 0",
              //   background: "rgba(255, 255, 255, 0.2)",
              color: MENU.THEME == "dark" ? "white" : "black",
              height: 64,
              fontSize: "x-large",
              fontWeight: 700,
              padding: 10,
              display: "flex",
              alignItems: "center",
            }}
          >
            {TITLE}
          </div>
          <Menu
            theme={MENU.THEME ?? "dark"}
            mode="horizontal"
            defaultSelectedKeys={defaultSelectedKey}
            key={defaultSelectedKey}
            items={items}
            onClick={onClickMenu}
            overflowedIndicator={
              windowSize.width > 768 ? (
                <div style={{ textAlign: "center" }}>
                  <DownOutlined style={{ fontSize: 15 }} />
                </div>
              ) : (
                <div style={{ width: 50, textAlign: "center" }}>
                  <MenuOutlined style={{ fontSize: 25 }} />
                </div>
              )
            }
            triggerSubMenuAction={"click"}
          />
        </div>
      )}
      {windowSize.width < 768 && (
        <div style={{ marginLeft: 15, marginTop: 5 }}>
          <Dropdown
            menu={{
              style: { marginTop: 14, width: windowSize.width },
              items,

              onClick: onClickMenu,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <MenuOutlined style={{ fontSize: 25 }} />
              </Space>
            </a>
          </Dropdown>
        </div>
      )}
    </div>
  );
}

export default Topnav;

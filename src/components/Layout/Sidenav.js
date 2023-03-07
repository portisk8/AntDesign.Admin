import React, { useEffect, useState } from "react";
import { Drawer, Image, Layout, Menu } from "antd";
// import { items } from "./MenuItems";
import { useSelector } from "react-redux";
import { getMenuData } from "../../common/menu";
import { useNavigate } from "react-router-dom";
import { searchTree } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { setBreadcrumb, sideMenuCollapse } from "../../store/slices/layout";
import { useWindowSize } from "../../utils/Hooks/useWindowSize";
import CONFIG from "../../common/environment";

const { MENU } = CONFIG;
const { Sider } = Layout;

function Sidenav() {
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
    var node = searchTree(items, "key", e.key);
    if (node) {
      if (windowSize.width < 768 && sideMenuCollapsed)
        dispatch(sideMenuCollapse());
      dispatch(setBreadcrumb(node.breadcrumb));
      navigate(node.path);
    }
  };

  return windowSize.width < 768 ? (
    <Drawer
      placement="left"
      style={{ minWidth: "fit-content" }}
      onClose={() => dispatch(sideMenuCollapse())}
      open={sideMenuCollapsed}
      closable={false}
    >
      <Sider trigger={null}>
        <Menu
          mode="inline"
          defaultSelectedKeys={defaultSelectedKey}
          key={defaultSelectedKey}
          items={items}
          onClick={onClickMenu}
        />
      </Sider>
    </Drawer>
  ) : (
    <Sider
      trigger={null}
      collapsible
      collapsed={sideMenuCollapsed}
      theme={MENU.THEME ?? "dark"}
    >
      <div
        style={{
          color: MENU.THEME == "dark" ? "white" : "black",
          height: 64,
          fontSize: "x-large",
          fontWeight: 700,
          padding: 10,
          display: "flex",
        }}
      >
        {sideMenuCollapsed ? (
          <span>
            {CONFIG.TITLE_SHORT}
            {/* <Image
              preview={false}
              width={50}
              src={require("../../assets/images/main.png")}
            /> */}
          </span>
        ) : (
          <span style={{ display: "flex", alignItems: "center" }}>
            {CONFIG.TITLE}
            {/* <Image
              width={100}
              preview={false}
              src={require("../../assets/images/main.png")}
            /> */}
          </span>
        )}
      </div>
      <Menu
        theme={MENU.THEME ?? "dark"}
        mode="inline"
        defaultSelectedKeys={defaultSelectedKey}
        key={defaultSelectedKey}
        items={items}
        onClick={onClickMenu}
      />
    </Sider>
  );
}

export default Sidenav;

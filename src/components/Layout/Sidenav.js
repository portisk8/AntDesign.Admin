import React, { useEffect, useState } from "react";
import { Drawer, Layout, Menu } from "antd";
// import { items } from "./MenuItems";
import { useSelector } from "react-redux";
import { getMenuData } from "../../common/menu";
import { useNavigate } from "react-router-dom";
import { searchTree } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { setBreadcrumb, sideMenuCollapse } from "../../store/slices/layout";
import { useWindowSize } from "../../utils/Hooks/useWindowSize";
import CONFIG from "../../common/environment";
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
      width={500}
      onClose={() => dispatch(sideMenuCollapse())}
      visible={sideMenuCollapsed}
    >
      <Sider trigger={null} theme="dark">
        <div
          style={{
            color: "white",
            height: 64,
            fontSize: "x-large",
            fontWeight: 700,
            padding: 10,
            display: "flex",
          }}
        >
          <span>{CONFIG.TITLE}</span>
        </div>
        <Menu
          theme="dark"
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
      theme="dark"
    >
      <div
        style={{
          color: "white",
          height: 64,
          fontSize: "x-large",
          fontWeight: 700,
          padding: 10,
          display: "flex",
        }}
      >
        {sideMenuCollapsed ? (
          <span>{CONFIG.TITLE_SHORT}</span>
        ) : (
          <span>{CONFIG.TITLE}</span>
        )}
      </div>
      <Menu
        theme="dark"
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

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import "./index.scss";
import { Layout, Menu } from "antd";
import Footer from "./Footer";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Emitter from "../../utils/emitter";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/users";
import CONFIG from "../../common/environment";

const { MENU } = CONFIG;
const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setVisible(false);
      navigate("/sign-in");
    } else {
      setVisible(true);
    }

    //Registrando eventos Listeners
    Emitter.on("LOGOUT", (value) => dispatch(logout()));
  }, []);

  return visible ? (
    <Layout style={{ minHeight: "100%" }}>
      {MENU.TYPE?.toLocaleLowerCase() == "side" && <Sidenav />}
      <Layout className="site-layout" style={{ display: "flex" }}>
        <Header />
        <Content
          className="site-layout-background"
          style={{
            marginTop: 5,
            // padding: 24,
            backgroundColor: "white",
            // backgroundColor: "transparent",
            // minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  ) : (
    children
  );
}

export default Main;

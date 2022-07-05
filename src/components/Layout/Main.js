import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./index.scss";
import { Layout } from "antd";
import Footer from "./Footer";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Emitter from "../../utils/emitter";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/users";

const { Content } = Layout;

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
      <Sidenav />
      <Layout className="site-layout">
        <Header />
        <Content
          className="site-layout-background"
          style={{
            marginTop: 5,
            // padding: 24,
            backgroundColor: "transparent",
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

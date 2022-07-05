import { Button } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeaderLayout from "../../components/PageHeaderLayout/PageHeaderLayout";

function Home() {
  const navigate = useNavigate();
  return (
    <PageHeaderLayout title={"Inicio"}>
      <div></div>
    </PageHeaderLayout>
  );
}

export default Home;

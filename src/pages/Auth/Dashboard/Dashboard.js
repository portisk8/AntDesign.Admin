import { Card } from "antd";
import React from "react";
import PageHeaderLayout from "../../../components/PageHeaderLayout/PageHeaderLayout";

function Dashboard() {
  return (
    <PageHeaderLayout title={"Dashboard"}>
      <Card bordered={false}>
        <h1> Aqui va un dashboard</h1>
      </Card>
    </PageHeaderLayout>
  );
}

export default Dashboard;

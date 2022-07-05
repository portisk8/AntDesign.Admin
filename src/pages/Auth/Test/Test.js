import { Card } from "antd";
import React from "react";
import PageHeaderLayout from "../../../components/PageHeaderLayout/PageHeaderLayout";

function Test() {
  return (
    <PageHeaderLayout title={"Test"}>
      <Card bordered={false}>
        <h1> Aqui va una vista de Test</h1>
      </Card>
    </PageHeaderLayout>
  );
}

export default Test;

import { Card } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import PageHeaderLayout from "../../../components/PageHeaderLayout/PageHeaderLayout";

function TestWithId() {
  const { testId } = useParams();
  return (
    <PageHeaderLayout title={"Test con Id"}>
      <Card bordered={false}>
        <h1> El Id que me pasaste es: {testId}</h1>
      </Card>
    </PageHeaderLayout>
  );
}

export default TestWithId;

import { BackwardOutlined, LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton(props) {
  const navigate = useNavigate();
  return (
    <Button
      className={props.className}
      type="primary"
      onClick={() => navigate(-1)}
    >
      <LeftOutlined />
      Volver
    </Button>
  );
}

export default BackButton;

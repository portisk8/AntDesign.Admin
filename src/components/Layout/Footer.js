import React from "react";
import { Layout } from "antd";
import dayjs from "dayjs";
import CONFIG from "../../common/environment";
const { Footer: AntdFooter } = Layout;

function Footer() {
  return (
    <div
      style={{
        textAlign: "center",
        // position: "absolute",
        // left: 0,
        // bottom: 0,
        // right: 0,
      }}
    >
      {CONFIG.CLIENT_NAME}©{dayjs().format("YYYY")} - {CONFIG.PROJECT_NAME} V-
      {CONFIG.PROJECT_VERSION}
    </div>
  );
}
export default Footer;

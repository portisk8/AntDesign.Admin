import React from "react";
import { Layout } from "antd";
import dayjs from "dayjs";
import CONFIG from "../../common/environment";
const { Footer: AntdFooter } = Layout;

const footerText = `${CONFIG.TITLE_SHORT}©${dayjs().format("YYYY")} - ${
  CONFIG.TITLE
} v${CONFIG.VERSION}`;

function Footer1() {
  return <AntdFooter style={{ textAlign: "center" }}>{footerText}</AntdFooter>;
}
function Footer() {
  return <div style={{ textAlign: "center" }}>{footerText}</div>;
}
export default Footer;

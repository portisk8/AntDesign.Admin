import React from "react";
import { Button, Result } from "antd";
const PageNotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Lo sentimos, la página que visitaste no existe."
    extra={
      <Button type="primary" href="/">
        Volver al Inicio
      </Button>
    }
  />
);
export default PageNotFound;

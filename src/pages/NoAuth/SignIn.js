import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
import { useNavigate } from "react-router";
import Footer from "../../components/Layout/Footer";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/users";
import CONFIG from "../../common/environment";

function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title, Text } = Typography;
const { Content } = Layout;

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [username, setUsername] = useState();
  // const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    dispatch(login(values)).then((data) => {
      setLoading(false);
      if (data && data.access_token) navigate("/");
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <>
      <Layout
        className="layout-default layout-signin"
        style={{ minHeight: "100vh" }}
      >
        <Content
          className="signin"
          style={{ display: "grid", alignItems: "center" }}
        >
          <Row justify="center">
            <Col xs={{ span: 24 }} lg={{ span: 6 }} md={{ span: 12 }}>
              <div style={{ textAlign: "center" }}>
                <Title className="mb-15">{CONFIG.PROJECT_NAME}</Title>
                <Text className="font-regular text-muted" level={5}>
                  Inicio de sesión de usuario
                </Text>
              </div>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Usuario"
                  name={["username"]}
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa usuario",
                    },
                  ]}
                >
                  <Input placeholder="Usuario" size="large" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  name={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa tu contraseña",
                    },
                  ]}
                >
                  <Input
                    type="password"
                    placeholder="Contraseña"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  // name={["remember"]}
                  className="aligin-center"
                  valuePropName="checked"
                >
                  <Switch defaultChecked onChange={onChange} /> Recuérdame
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  loading={loading}
                  size={"large"}
                >
                  Ingresar
                </Button>
              </Form>
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export default SignIn;

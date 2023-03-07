import React, { useState } from "react";
import {
  Layout,
  Menu,
  Image,
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
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { useWindowSize } from "../../utils/Hooks/useWindowSize";

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
  const windowSize = useWindowSize();

  useEffect(() => {
    console.log(CONFIG);
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const responseData = await dispatch(login(values));
      setLoading(false);
      if (responseData && responseData.access_token) navigate("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  const handleSuccesGoogleLogin = (response) => {
    console.log(response);
    onFinish({ externalToken: response.credential });
  };
  const handleErrorGoogleLogin = (error) => {
    console.log(error);
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
          <Row
            justify="center"
            style={{ margin: windowSize.width < 768 ? 20 : 0 }}
          >
            <Col xs={{ span: 24 }} lg={{ span: 6 }} md={{ span: 12 }}>
              <div style={{ textAlign: "center" }}>
                <Title className="mb-15">
                  <Image
                    preview={false}
                    width={300}
                    src={require("../../assets/images/main.png")}
                  />
                </Title>
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
                {CONFIG.GOOGLE.isEnable && (
                  <div
                    style={{
                      marginTop: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <GoogleOAuthProvider clientId={CONFIG.GOOGLE.clientId}>
                      <GoogleLogin
                        onSuccess={handleSuccesGoogleLogin}
                        onError={handleErrorGoogleLogin}
                      />
                    </GoogleOAuthProvider>
                  </div>
                )}
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

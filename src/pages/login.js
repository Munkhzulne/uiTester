import React, { useState, useContext } from "react"
import { Link, navigate } from "gatsby"
import {
  Layout,
  Row,
  Input,
  Form,
  Button,
  Col,
  Typography,
  Divider,
  Space,
} from "antd"
import Logo from "../images/logo2.svg"
import { useFirebase, useDocumentWithAccount } from "../firebase"
import { AuthContext, AuthUserProvider } from "../context/AuthContext"
import * as _ from 'lodash'
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons"

const { Content } = Layout
const { Text } = Typography

const Login = () => {
  const { auth } = useFirebase()
  let { data: account, loading } = useDocumentWithAccount("")
  const { user, ready } = useContext(AuthContext)
  const [form, setForm] = useState({ email: "", password: "" })
  const onInputChanged = e => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }
  const login = async () => {
    const { email, password } = form
    await auth.signInWithEmailAndPassword(email, password)
    if(!loading) {
      if (_.has(account, "skills") || account.accountType != "designer") {
        navigate("/")
      } else {
        navigate("/newDesigner")
      }
    }
  }
  if (user != null && user) {
    navigate("/")
  }
  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <Row align="middle" justify="center" className="h100">
          <Col className="login-form">
            <Space size="large" direction="vertical">
            <Row justify="center">
              <img src={Logo} width="80%"/>
            </Row>
            <Row justify="center">
              <h1>Log In</h1>
            </Row></Space>
            <Form onFinish={login}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Email"
                  size="large"
                  id="email"
                  value={form.email}
                  onChange={onInputChanged}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  value={form.password}
                  onChange={onInputChanged}
                  id="password"
                  prefix={<LockOutlined />}
                  type="password"
                  size="large"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Row justify="space-between">
                  <Link>
                    <Text type="secondary">Forgot Password</Text>
                  </Link>
                  <Link to="/signup">
                    <Text type="secondary">Sign Up</Text>
                  </Link>
                </Row>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  size="large"
                  className="btn-grad"
                  block
                >
                  Log In
                </Button>
              </Form.Item>
            </Form>
            <Divider></Divider>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
const App = ({ children }) => {
  return (
    <AuthUserProvider>
      <div
        className=""
        style={{
          minHeight: "100vh",
          alignItems: "stretch",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </AuthUserProvider>
  )
}

export default () => {
  return (
    <App>
      <Login />
    </App>
  )
}

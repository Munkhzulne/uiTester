import React, { useContext } from "react"
import { Link, navigate } from "gatsby"
import { App } from "./"
import { AuthContext } from "../context/AuthContext"
import { useDocumentWithAccount } from "../firebase"
import { Layout, Row, Col, Menu, Space, Dropdown, Spin } from "antd"
import Logo from "../images/logo.svg"
import { DownOutlined, LoadingOutlined } from "@ant-design/icons"

const { Header, Footer, Sider, Content } = Layout
const UserMenu = () => {
  let { data: userData } = useDocumentWithAccount("")
  const { user, loading, logout } = useContext(AuthContext)
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/settings">Setting</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <a className="t-link" onClick={e => e.preventDefault()}>
        {userData && `${userData.firstname} ${userData.lastname}`}{" "}
        <DownOutlined />
      </a>
    </Dropdown>
  )
}
const Navigation = () => {
  const { user, ready } = useContext(AuthContext)
  return (
    <>
      <Layout.Header  style={{ padding: "10px", background: "#06052f",}}>
        <Row justify="space-between" className="w100">
          <Col offset={2} lg={4}>
            <Link to="/">
              <img src={Logo} width={130}></img>
            </Link>
          </Col>

          <Col offset={11} style={{ alignContent: "end" }}>
            
              <>
                {user ? (
                  <UserMenu />
                ) : (
                  <Space size="large">
                    <Link
                      style={{ fontSize: "18px", color: "#BDBDBD" }}
                      to="/login"
                    >
                      Log In
                    </Link>
                    <Link
                      style={{ fontSize: "18px", color: "#4776e6" }}
                      to="/signup"
                    >
                      Sign Up
                    </Link>
                  </Space>
                )}
              </>
          </Col>
          <Col lg={1}></Col>
        </Row>
      </Layout.Header>
    </>
  )
}
export { Navigation }

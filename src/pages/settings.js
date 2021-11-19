import React, { useState, useContext } from "react"
import { App } from "../components"
import { Layout, Menu } from "antd"
import { UserOutlined, LockOutlined, ProfileOutlined } from "@ant-design/icons"
import { EditProfile } from "../components"
import * as _ from "lodash"
import { navigate } from "gatsby"
import { AuthContext, AuthUserProvider } from "../context/AuthContext"

const Settings = () => {
  const { user, ready } = useContext(AuthContext)
  console.log(user)
  if (user == null && ready) {
    navigate("/")
  }
  return (
    <App>
      <Layout style={{ background: "white", minHeight: "100vh" }}>
        <Layout>
          <Layout.Sider width={300} breakpoint="lg" collapsedWidth="0" style={{ background: "#06052f" }}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                Ерөнхий мэдээлэл
              </Menu.Item>
            </Menu>
          </Layout.Sider>
          <Layout.Content>
            <div style={{ padding: "25px" }}>
              <EditProfile />
            </div>
          </Layout.Content>
          <Layout.Sider style={{ background: "#f0f2f5" }}></Layout.Sider>
        </Layout>
      </Layout>
    </App>
  )
}
export default Settings

import React, { useContext } from "react"
import { StringParam, useQueryParam } from "use-query-params"
import {
  Col,
  Layout,
  Row,
  Avatar,
  Typography,
  Statistic,
  Space,
  Divider,
  Tabs,
  Spin,
  Tag,
} from "antd"
import { AuthContext, AuthUserProvider } from "../context/AuthContext"
import { App, Posts } from "../components"
import { useDocument, updateRecord } from "../firebase"

import {
  UserOutlined,
  HeartTwoTone,
  TrophyTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons"
import { navigate } from "gatsby"
const User = () => {
  const [id, setId] = useQueryParam("u", StringParam)
  console.log(id)
  const { user, ready } = useContext(AuthContext)
  const { data: account, loading } = useDocument(`users/${id}`)
  console.log(account)
  const like = () => {
     updateRecord(`users/${id}`, {feedback: account.feedback+1})
  }
  if (user == null && ready) {
    navigate("/")
  }
  return (
    <App>
      <Layout>
        <Layout.Header className="profile-header"></Layout.Header>
        <Layout.Content
          style={{
            padding: "30px",
            top: "-160px",
            background: "white",
            position: "relative",
            width: "1000px",
            alignSelf: "center",
          }}
        >
          {loading ? (
            <Spin spinning={true} size="large"></Spin>
          ) : (
            <>
              <Row>
                <Col span={8}>
                  <Row>
                    <Avatar
                      shape="square"
                      size={220}
                      src={account && account.profile && account.profile}
                      icon={account && !account.profile && <UserOutlined />}
                    />
                  </Row>
                </Col>
                <Col span={15}>
                  <Space size="middle" direction="vertical" className="w100">
                    <div>
                      <Typography.Title level={3} style={{ marginBottom: 0 }}>
                        {account && `${account.firstname} ${account.lastname}`}
                      </Typography.Title>
                      <Typography.Text>
                        {account && `${account.email}`}
                      </Typography.Text>
                    </div>
                    <Row align="middle">
                      <Col span={12}>
                        <Statistic
                          title="Uploaded sketches"
                          value={account && account.jobs}
                          prefix={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title="Feedback"
                          value={account && account.feedback}
                          prefix={<HeartTwoTone twoToneColor="#eb2f96" onClick={like}/>}
                        />
                      </Col>
                    </Row>
                    <Divider></Divider>
                    <div>
                      <Typography.Title level={5}>About me</Typography.Title>
                      <Typography.Text>
                        {account &&
                          (account.descripton ? account.descripton : "")}
                      </Typography.Text>
                    </div>
                  </Space>
                </Col>
              </Row>
              <Row className="w100">
                <Tabs defaultActiveKey="1" className="w100">
                  <Tabs.TabPane tab="Personal information" key="1">
                    <Divider orientation="left">
                      <Typography.Title level={4}>Languages</Typography.Title>
                    </Divider>
                    {account &&
                      account.languages &&
                      account.languages.map(el => (
                        <Tag className="tag">{el}</Tag>
                      ))}
                    <Divider orientation="left">
                      <Typography.Title level={4}>Skills</Typography.Title>
                    </Divider>
                    {account &&
                      account.skills &&
                      account.skills.map(el => <Tag className="tag">{el}</Tag>)}
                    <Divider orientation="left">
                      <Typography.Title level={4}>Experience</Typography.Title>
                    </Divider>
                    <Divider orientation="left">
                      <Typography.Title level={4}>
                        Social accounts
                      </Typography.Title>
                    </Divider>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Uploaded sketches" key="2">
                    <Posts id={id}/>
                  </Tabs.TabPane>
                </Tabs>
              </Row>
            </>
          )}
        </Layout.Content>
      </Layout>
    </App>
  )
}
export default User

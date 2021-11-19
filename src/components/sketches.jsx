import {
  Divider,
  Layout,
  List,
  Card,
  Col,
  Typography,
  Image,
  Row,
  Spin,
} from "antd"
import React from "react"
import { Navigation } from "../components"
import Logo from "../images/Sketch.svg"
import { Link } from "gatsby"
import { useCollection } from "../firebase"
import { UserOutlined } from "@ant-design/icons"
import Avatar from "antd/lib/avatar/avatar"
const { Header, Footer, Sider, Content } = Layout
const Sketches = () => {
  let { data, loading } = useCollection("track")
  return (
    <>
      {loading ? (
        <Spin></Spin>
      ) : (
        <List
          grid={{ gutter: 9, column: 3 }}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Card
                hoverable
                cover={<Image src={item.picture} />}
                actions={[
                  <Link to={`/track?task=${item.id}`}>Track</Link>,
                  <Link to={`/result?task=${item.id}`}>Result</Link>,
                ]}
              >
                <Card.Meta
                  title={item.task}
                  avatar={<Link to={item.user ? `/meetDesigner?u=${item.user}` : "/user"}> <Avatar icon={<UserOutlined/>}/> </Link>}
                  description={
                    item.description ? item.description : "No description"
                  }
                />
              </Card>
            </List.Item>
          )}
        ></List>
      )}
    </>
  )
}
export { Sketches }

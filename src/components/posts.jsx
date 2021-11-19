import React from "react"
import { Button, Card, List, Avatar, Spin, Skeleton, Image } from "antd"
import {
  SettingOutlined,
  EditOutlined,
  UserOutlined,
  EllipsisOutlined,
} from "@ant-design/icons"
import { useCollection,useDocument, useCollectionWithAccount, useDocumentWithAccount } from "../firebase"
import { Link } from "gatsby"

export const Posts = ({id = null}) => {
  const { data, loading } = useCollection(`users/${id}/posts`)
  const { data: account } = useDocument(`users/${id}`)

  return (
    <div>
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
                cover={<Image src={item.photo} />}
                actions={[
                  <Link to={`/result?task=${item.id}`}>Result</Link>,
                ]}
              >
                <Card.Meta
                  title={item.title}
                  avatar={
                    <Link to={`/profile`}>
                      <Avatar src={account && (account.profile && account.profile)} icon={account && (!account.profile && <UserOutlined />)}/>
                    </Link>
                  }
                  description={
                    item.description ? item.description : "No description"
                  }
                />
              </Card>
            </List.Item>
          )}
        ></List>
      )}
    </div>
  )
}
export const OwnPosts = () => {
  const { data, loading } = useCollectionWithAccount("posts")
  const { data: account } = useDocumentWithAccount("")

  return (
    
    <div>
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
                cover={<Image src={item.photo} />}
                actions={[
                  <Link to={`/result?task=${item.id}`}>Result</Link>,
                ]}
              >
                <Card.Meta
                  title={item.title}
                  avatar={
                    <Link to={`/profile`}>
                      <Avatar src={account && (account.profile && account.profile)} icon={account && (!account.profile && <UserOutlined />)}/>
                    </Link>
                  }
                  description={
                    item.description ? item.description : "No description"
                  }
                />
              </Card>
            </List.Item>
          )}
        ></List>
      )}
    </div>
  )
}

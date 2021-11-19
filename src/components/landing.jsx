import React, { createRef, useState } from "react"
import { Link, navigate } from "gatsby"
import { App, Navigation } from "../components"
import { Layout, Row, Col, Space, Button, Typography } from "antd"
import "../css/index.css"
const Landing = () => {
  return (
    <>
    <Layout className="landingPage">
      <Row align="middle" justify="end" className="h100">
        <Col
          span={10}
          offset={3}
          lg={10}
          xs={24}
          md={12}
          style={{ marginRight: "70px", paddingLeft: "70px" }}
        >
          <Typography.Title
            style={{ fontSize: "60px", color: "white", marginBottom: "0" }}
          >
            We give perfect feedback for your Sketch.
          </Typography.Title>
          <Typography.Text style={{ fontSize: "22px", color: "#BDBDBD" }}>
            Design is not just look like and feels like. Design is how it works.
          </Typography.Text>
          <Space size="large" className="w100" style={{ marginTop: "20px" }}>
            <Button className="w100 btn-grad " size="large" onClick={() => navigate("/designer/")}>
              I am Designer
            </Button>
            <Button className="w100 btn-grad " size="large" onClick={() => navigate("/user/")}>
              I am User
            </Button>
          </Space>
        </Col>
      </Row>
    </Layout>
    
    </>
  )
}

export  {Landing}

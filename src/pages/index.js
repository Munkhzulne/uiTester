import React, { createRef, useState } from "react"
import { Link, navigate } from "gatsby"
import { useFirebase, useCollection } from "../firebase"
import { Landing, Navigation, App } from "../components"
import { Layout, Row, Col, Space, Button, Typography } from "antd"
import "../css/index.css"
const IndexPage = () => {
  return (
    <App>
      <Layout className="landingPage">
        <Landing />
      </Layout>
    </App>
  )
}

export default IndexPage

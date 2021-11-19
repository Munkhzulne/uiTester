import React, { useState, useEffect, useRef } from "react"
import * as _ from "lodash"
import {
  updateRecordWithAccount,
  useDocumentWithAccount,
  useFirebase,
} from "../firebase"
import {
  Avatar,
  Row,
  Col,
  Upload,
  Button,
  Space,
  Select,
  Radio,
  Divider,
  Spin,
  Input,
} from "antd"
import { UserOutlined, UploadOutlined } from "@ant-design/icons"
import { languages, skills } from "../data"
import { navigate } from "gatsby"

export const EditProfile = () => {
  const { firebase } = useFirebase()
  const fileInput = useRef()
  let { data: account } = useDocumentWithAccount("")
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    profile: null,
    languages: [],
    experience: "Beginner",
    skills: [],
  })

  useEffect(() => {
    if (account)
      setForm({
        firstname: account.firstname ? account.firstname : "",
        lastname: account.lastname ? account.lastname : "",
        languages: account.languages ? account.languages : [],
        experience: account.experience ? account.experience : "Beginner",
        skills: account.skills ? account.skills : [],
        profile: account.profile ? account.profile : null,
      })
  }, [account])
  const [loading, setLoading] = useState(false)
  const handleLanguage = value => {
    console.log(`${_.isArray(value)}`)
    setForm({ ...form, languages: value })
  }
  const handleExperience = e => {
    setForm({ ...form, experience: e.target.value })
  }
  const handleSkills = value => {
    setForm({ ...form, skills: value })
  }
  const saveUserInfo = async () => {
    setLoading(true)
    const { experience, skills, profile, languages, firstname, lastname } = form
    if (profile != null) {
      let storage = firebase.storage().ref()
      let thisRef = storage.child(profile.name + Date.now().toString())
      await thisRef.put(profile).then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          updateRecordWithAccount("", {
            firstname,
            lastname,
            experience,
            skills: [...skills],
            profile: downloadURL,
            languages: [...languages],
          })
        })
      })

      setLoading(false)
    } else {
      await updateRecordWithAccount("", {
        firstname,
        lastname,
        experience,
        skills: [...skills],
        languages: [...languages],
      })
      setLoading(false)
    }
    fileInput.current.value = ""
  }
  return (
    <Spin size="large" spinning={loading}>
      <Space size="middle" direction="vertical" style={{ width: "100%" }}>
        <div>
          <h2>Profile picture</h2>
          <Space size="small" direction="vertical">
            <Avatar
              shape="square"
              size={200}
              src={account && account.profile && account.profile}
              icon={account && !account.profile && <UserOutlined />}
            />
            <input
              onChange={e => setForm({ ...form, profile: e.target.files[0] })}
              ref={fileInput}
              type="file"
              accept="image/*"
              multiple={false}
            />
          </Space>
        </div>
        <div>
          <h2>Name</h2>
          <Row style={{ width: "100%" }}>
            <Col xs={24} lg={11}>
              <Input
                prefix={<UserOutlined />}
                placeholder="Firstname"
                size="large"
                id="firstname"
                value={form.firstname}
                onChange={e => setForm({ ...form, firstname: e.target.value })}
              />
            </Col>
            <Col xs={24} lg={11} offset={2}>
              <Input
                prefix={<UserOutlined />}
                placeholder="Lastname"
                size="large"
                id="lastname"
                value={form.lastname}
                onChange={e => setForm({ ...form, lastname: e.target.value })}
              />
            </Col>
          </Row>
        </div>
        <div style={{ width: "100%" }}>
          <h2>Languages</h2>
          <Select
            mode="multiple"
            size="large"
            value={form.languages}
            placeholder=""
            onChange={handleLanguage}
            style={{ width: "100%" }}
          >
            {languages
              .filter(e => !form.languages.includes(e))
              .map(e => (
                <Select.Option key={e}>{e}</Select.Option>
              ))}
          </Select>
        </div>
        <div style={{ width: "100%" }}>
          <h2>Ур чадварууд</h2>
          <Select
            mode="multiple"
            value={form.skills}
            size="large"
            placeholder=""
            onChange={handleSkills}
            style={{ width: "100%" }}
          >
            {skills
              .filter(e => !form.skills.includes(e))
              .map(e => (
                <Select.Option key={e}>{e}</Select.Option>
              ))}
          </Select>
        </div>
        <div style={{ width: "100%" }}>
          <h2>Experience</h2>
          <Radio.Group
            value={form.experience}
            style={{ width: "100%" }}
            onChange={handleExperience}
          >
            <Row justify="space-around" align="middle">
              <Col span={8} xs={24} lg={6}>
                <Radio.Button value="Beginner" className="experience">
                  <div className="t-center">
                    <Divider />
                    <h5>Beginner</h5>
                    <Divider />
                  </div>
                </Radio.Button>
              </Col>

              <Col span={8} xs={24} lg={6}>
                <Radio.Button value="Intermediate" className="experience">
                  <div className="t-center">
                    <Divider />
                    <h5>Intermediate</h5>
                    <Divider />
                  </div>
                </Radio.Button>
              </Col>

              <Col span={8} xs={24} lg={6}>
                <Radio.Button value="Advanced" className="experience">
                  <div className="t-center">
                    <Divider />
                    <h5>Advanced</h5>
                    <Divider />
                  </div>
                </Radio.Button>
              </Col>
            </Row>
          </Radio.Group>
        </div>
        <Row justify="end">
          <Button
            type="primary"
            onClick={saveUserInfo}
            shape="round"
            size="large"
            className="btn-grad"
            block
          >
            Save
          </Button>
        </Row>
      </Space>
    </Spin>
  )
}

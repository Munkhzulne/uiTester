// import { Button, Card, Form, Input, Spin, Modal, Typography } from "antd"
// import React, { useRef, createRef, useState } from "react"
// import axios from "axios"
// import {
//   createRecordWithAccount,
//   useCollection,
//   useFirebase,
//   createRecord,
//   useUser,
// } from "../firebase"
// import * as _ from "lodash"
// import { baseApiURL } from "../data"
// import { navigate } from "gatsby"
// export const UploadPost = () => {
//   const fileInput = useRef()
//   const [form1] = Form.useForm()
//   const { firebase } = useFirebase()
//   const [loading, setLoading] = useState(false)
//   const [modal, setModal] = useState(false)
//   const [form, setForm] = useState({ description: "", title: "", file: null })
//   const { data: photos } = useCollection("photos")
//   const { user } = useUser()
//   const post = async () => {
//     const { description, title, file } = form
//     setLoading(true)
//     const data = new FormData()
//     if (file == null) {
//       await createRecordWithAccount("posts", { description, title })
//       setForm({ description: "", title: "", file: null })
//       form1.resetFields()
//       setLoading(false)
//     } else {
//       const { description, title, file } = form
//       let storage = firebase.storage().ref()
//       let thisRef = storage.child(file.name + Date.now().toString())
//       await thisRef.put(file).then(snapshot => {
//         snapshot.ref.getDownloadURL().then(downloadURL => {
//           createRecordWithAccount("posts", {
//             description,
//             title,
//             photo: downloadURL,
//           })
//           createRecord("photos", {
//             hash,
//             photo: downloadURL,
//             user: user ? user.uid : "",
//           })
//         })
//       })
//       fileInput.current.value = ""
//       setForm({ description: "", title: "", file: null })
//       form1.resetFields()
//       setLoading(false)
//       return
//     }
//   }
//   return (
//     <>
//       <Modal
//         visible={modal}
//         title="Алдаа"
//         onOk={() => navigate("/check")}
//         onCancel={() => setModal(false)}
//         footer={[
//           <Button key="back" onClick={() => setModal(false)}>
//             Буцах
//           </Button>,
//           <Button
//             key="submit"
//             type="primary"
//             loading={loading}
//             onClick={() => navigate("/check")}
//           >
//             Шалгуулах
//           </Button>,
//         ]}
//       >
//         Таны нийтлэлдээ хавсаргах гэсэн зурагтай адилхан эсвэл төстэй зургийг
//         өөр нэг хэрэглэгч хийсэн ажилдаа оруулсан байна.
//         <Typography.Text type="success">
//           {" "}
//           Манай систем зохиогчийн эрхийг хамгаалдаг{" "}
//         </Typography.Text>
//         тул хэн нэгний хийсэн бүтээлийг хуулбарлаж өөрийн ажилдаа оруулахыг
//         хориглодог. Хэрэв багаар ажилласан болон энэхүү зураг таны өөрийн өмч
//         мөн бол <Typography.Text type="success">
//           {" "}
//           шалгуулах
//         </Typography.Text>{" "}
//         боломжтой.
//       </Modal>
//       <Card
//         title="Шинээр нийтлэх"
//         size="small"
//         headStyle={{ background: "#001529", color: "white" }}
//         style={{ borderColor: "#001529" }}
//       >
//         <Spin tip="Уншиж байна" size="large" spinning={loading}>
//           <Form onFinish={post} form={form1}>
//             <Form.Item
//               name="title"
//               rules={[{ required: true, message: "Гарчигаа оруулна уу!" }]}
//             >
//               <Input
//                 id="title"
//                 placeholder="Нийтлэлийн гарчиг"
//                 value={form.title}
//                 onChange={e => setForm({ ...form, title: e.target.value })}
//               />
//             </Form.Item>

//             <Form.Item
//               name="description"
//               rules={[{ required: true, message: "Тайлбараа оруулна уу!" }]}
//             >
//               <Input.TextArea
//                 value={form.description}
//                 id="description"
//                 placeholder="Нийтлэлийн нэмэлт тайлбар"
//                 onChange={e =>
//                   setForm({ ...form, description: e.target.value })
//                 }
//               />
//             </Form.Item>

//             <Form.Item label="Зураг">
//               <input
//                 onChange={e => setForm({ ...form, file: e.target.files[0] })}
//                 ref={fileInput}
//                 type="file"
//                 accept="image/*"
//                 multiple={false}
//               />
//             </Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               style={{ background: "#001529", color: "white", border: "none" }}
//             >
//               Нийтлэх
//             </Button>
//           </Form>
//         </Spin>
//       </Card>
//     </>
//   )
// }

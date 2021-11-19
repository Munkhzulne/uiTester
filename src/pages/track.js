import React, { createRef, useEffect, useRef } from "react"
import { Link } from "gatsby"
import { useQueryParam, NumberParam, StringParam } from "use-query-params"
import { useFirebase, useDoc } from "../firebase"

const Track = () => {
  const [task, setTask] = useQueryParam("task", StringParam)
  const { firebase } = useFirebase()
  const { data } = useDoc(`track/${task}`)
  const canvasRef = createRef(null)
  useEffect(() => {
    let canvas = canvasRef.current
    let context = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    let img = document.createElement("img")
    img.src = data.picture
    img.onload = function () {
      context.drawImage(img, 0, 0)
    }
  }, [task, data])

  const track = event => {
    firebase.firestore().collection(`track/${task}/points`).add({
      x: event.clientX,
      y: event.clientY,
    })
  }

  return (
    <>
      <div>
        <button>
          <Link to="/user">Exit from Track</Link>
        </button>
      </div>
      <canvas ref={canvasRef} onClick={track}></canvas>
    </>
  )
}

export default Track

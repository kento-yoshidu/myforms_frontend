import React, { useState } from "react";

const MockServer = () => {
  const [clicked, setClicked] = useState(false)
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")

  const fetchUser = async () => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then(async (res) => {
        const result = await res.json()
        const { username } = result
        setUsername(username)
        setClicked(true)
      })
      .catch(() => {
        setError("Fetching Failed !")
      })
  }

  const buttonText = clicked ? "Loaded" : "Start Fetch"

  return (
    <div style={{ "margin": "100px auto" }}>
      <h1>MockServer</h1>

      <button onClick={fetchUser} disabled={clicked}>{buttonText}</button>

      <h3>{username}</h3>
    </div>
  )
}

export default MockServer

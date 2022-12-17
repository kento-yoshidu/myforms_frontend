import React, { useState } from "react"
import Layout from '../components/Layout'

import Styles from "./style.module.css"

const Forms1 = () => {
  const [name, setName] = useState("")
  const [data, setData] = useState("")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch("/api/form1", {
      method: "POST",
      body: JSON.stringify(name),
      headers: { 'Content-Type': 'application/json' }
    })

    console.log("data is ", data)

    if (data.status === 200) {
      const result = await data.json()
      setData(result.name)
    }

    if (data.status !== 200) {
      window.alert("error!")
    }
  }

  return (
    <Layout>
      <h1>Form1</h1>

      <p>あなたの名前を半角のアルファベットで入力してください。小文字だった場合は大文字にして返します。</p>

      <form onSubmit={submit}>
        <label
          htmlFor="name"
          className={Styles.label}
        >
          お名前
        </label>

        <input
          id="name"
          type="text"
          pattern="[A-Za-z]*"
          onChange={(e) => setName(e.target.value)}
          placeholder="Michael Schumacher"
        />

        <br />

        <input type="submit" name="Sign Up" />
      </form>

      {data && (
        <p>あなたの名前を大文字に変換しました！ {data}</p>
      )}
    </Layout>
  )
}

export default Forms1

// https://giancarlobuomprisco.com/next/handling-api-errors-in-nextjs

// https://zenn.dev/takepepe/articles/fetch-error-convolution

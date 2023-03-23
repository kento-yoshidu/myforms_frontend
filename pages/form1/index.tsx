import React, { useState } from "react"
import Header from "../../components/header"
import PageTitle from "../../components/pageTitle"

import Styles from "./style.module.css"

const Form1 = () => {
  const [name, setName] = useState("")
  const [data, setData] = useState("")
  const [isInputValidate, setIsInputValidate] = useState(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch("/api/form1", {
      method: "POST",
      body: JSON.stringify(name),
      headers: { 'Content-Type': 'application/json' }
    })

    if (data.status === 200) {
      const result = await data.json()
      setData(result.name)
    }

    /*
    if (data.status !== 200) {
      window.alert("error!")
    }
    */
  }

  /*
  const validation = () => {
    if (name.length === 0) {
      setIsInputValidate(false)
    } else {
      setIsInputValidate(true)
    }
  }
  */

  return (
    <>
      <Header />

      <PageTitle pageTitle="Form 1" />

      <h1 data-testid="page-title">Form1</h1>

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
          onChange={handleChange}
          placeholder="Michael Schumacher"
        />

        <p>name is {name}</p>

        {!isInputValidate && (
          <>
            <p>エラーです!</p>
          </>
        )}

        <input type="submit" name="Sign Up" />
      </form>

      {data && (
        <p>あなたの名前を大文字に変換しました！ {data}</p>
      )}
    </>
  )
}

export default Form1

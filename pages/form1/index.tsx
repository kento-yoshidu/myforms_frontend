import React, { useState } from "react"
import Container from "../../components/container"
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

    const data = await fetch("http://localhost:3000/api/form1", {
      method: "POST",
      body: JSON.stringify(name),
      headers: { 'Content-Type': 'application/json' }
    })

    if (data.status === 200) {
      const result = await data.json()
      setData(result.name)
    }
  }

  return (
    <>
      <Header />

      <PageTitle pageTitle="Form 1" />

      <Container>
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
            data-testid="name"
          />

          {!isInputValidate && (
            <>
              <p>エラーです!</p>
            </>
          )}

          <input
            data-testid="submit"
            type="submit"
            name="Sign Up"
          />
        </form>

        {data && (
          <p>あなたの名前を大文字に変換しました！ {data}</p>
        )}
      </Container>
    </>
  )
}

export default Form1

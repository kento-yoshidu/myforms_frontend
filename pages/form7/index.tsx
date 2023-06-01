import Head from "next/head"

import PageTitle from "../../components/page-header"
import Header from "../../components/header"
import Container from "../../components/container"

import styles from "../form1/style.module.css"
import { useState } from "react"

const Form7 = () => {
  const [result, setResult] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  }

  const submit =async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch("/api/api5", {
      method: "POST",
      body: JSON.stringify({ id: "hoge", password: "pass"}),
      headers: { "Content-Type": "application/json" }
    })

    console.log("data is = ", data)
  }

  return (
    <>
      <Head>
        <title>Form7 | MyForms</title>
      </Head>

      <Header />

      <PageTitle
        pageTitle="Form7"
        postdate="2023-01-15"
        update="2023-06-15"
      />

      <Container>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>
            ログインフォーム
          </h3>

          <p className={styles.text}>ユーザーIDとパスワードを入力してください（ID = user、パスワード = pass でログインできます）。</p>

          <form
            className={styles.form}
            onSubmit={submit}
          >
            <label htmlFor="id" className={styles.label}>
              ユーザーID
            </label>

            <input
              id="id"
              className={styles.input}
              placeholder="ID"
              required
            />

            <label htmlFor="password" className={styles.label}>
              パスワード
            </label>

            <input
              id="password"
              className={styles.input}
              placeholder="password"
              required
            />

            <button
              className={styles.button}
              type="submit"
              // disabled={!isFormValid}
            >
              ログイン
            </button>
          </form>
        </div>
      </Container>

    </>
  )
}

export default Form7

import Head from "next/head"

import PageTitle from "../../components/page-header"
import Header from "../../components/header"
import Container from "../../components/container"

import styles from "../form1/style.module.css"
import { useState } from "react"
import { UserData } from "../form5"

type LoginData = {
  username: string
  password: string
}

const Form7 = () => {
  const [formData, setFormData] = useState<LoginData>({
    username: "",
    password: ""
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLogin) {
      setIsLoading(true)

      const data = await fetch("/api/api5", {
        method: "POST",
        body: JSON.stringify({ id: "id", password: "pass"}),
        headers: { "Content-Type": "application/json" }
      })

      setIsLoading(false)

      if (data.ok) {
        setIsLogin(true)
      }
    } else {
      setIsLogin(false)
    }
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
              onChange={handleChange}
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

            {isLogin
              ? (
                <button type="submit">
                  ログアウト
                </button>
              ) : (
                <>
                  {isLoading
                    ? (
                      <p>ロード中...</p>
                    ) : (
                      <button
                        className={styles.button}
                        type="submit"
                      >
                        ログイン
                      </button>
                    )}
                </>
              )}

              {isLogin && (
                <p>ログインに成功しました！</p>
              )}
          </form>
        </div>
      </Container>

    </>
  )
}

export default Form7

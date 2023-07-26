import { useState } from "react"

import Head from "next/head"

import PageTitle from "../../components/page-header"
import Header from "../../components/header"
import Container from "../../components/container"
import PageLink from "../../components/page-link"
import HomeLink from "../../components/home-link"
import Description from "../../components/description"

import styles from "../form1/style.module.css"

type LoginData = {
  id: string
  password: string
}

const Form7 = () => {
  const [formData, setFormData] = useState<LoginData>({
    id: "",
    password: ""
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLogin) {
      setIsLoading(true)

      const data = await fetch("/api/api5", {
        method: "POST",
        body: JSON.stringify({ id: formData.id, password: formData.password }),
        headers: { "Content-Type": "application/json" }
      })

      setIsLoading(false)

      if (data.ok) {
        setIsLogin(true)
        setErrorMessage(null)
      } else {
        const res = await data.json()
        setErrorMessage(res.errorMessage)
      }
    } else {
      // ログアウト
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
        postdate="2023-07-25"
        update="2023-07-26"
      />

      <Container>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>
            ログインフォーム
          </h3>

          <p className={styles.text}>ユーザーIDとパスワードを入力してください<br />（ID = user、パスワード = pass でログインできます）。</p>

          <form
            className={styles.form}
            onSubmit={submit}
          >
            <label htmlFor="id" className={styles.label}>
              ユーザーID
            </label>

            <input
              id="id"
              name="id"
              className={styles.input}
              placeholder="id"
              onChange={handleChange}
              required
              disabled={isLogin}
            />

            <label htmlFor="password" className={styles.label}>
              パスワード
            </label>

            <input
              id="password"
              name="password"
              className={styles.input}
              placeholder="password"
              onChange={handleChange}
              required
              disabled={isLogin}
            />

            {errorMessage && (
              <>
                <p>エラー発生!</p>
                <p>{errorMessage}</p>
              </>
            )}

            {isLogin
              ? (
                <button
                  className={styles.button}
                  type="submit"
                >
                  ログアウト
                </button>
              ) : (
                <>
                  {isLoading
                    ? (
                      <p>認証中...</p>
                    ) : (
                      <button
                        className={styles.button}
                        type="submit"
                      >
                        ログイン
                      </button>
                    )}
                  </>
                )
            }

            {isLogin && (
              <p>ログインに成功しました！</p>
            )}
          </form>
        </div>

        <Description>
          <p>7月26日時点、まだ作業中。。。👷‍♂️</p>
        </Description>

        <PageLink prev="6" />

        <HomeLink />
      </Container>
    </>
  )
}

export default Form7

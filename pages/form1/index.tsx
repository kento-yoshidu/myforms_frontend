import React, { useState } from "react"
import Head from "next/head"

import Container from "../../components/container"
import Header from "../../components/header"
import PageTitle from "../../components/pageTitle"
import HomeLink from "../../components/home-link"

import styles from "./style.module.css"
import descStyles from "../../styles/description.module.css"
import Description from "../../components/description"

const Form1 = () => {
  const [name, setName] = useState("")
  const [convertedData, setConvertedData] = useState("")
  const [isClickable, setIsClickable] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)

    if (e.target.value.length > 0) {
      setIsClickable(() => true)
    } else {
      setIsClickable(() => false)
    }
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
      setConvertedData(result.name)
    }
  }

  return (
    <>
      <Head>
        <title>From1 | My Forms</title>
      </Head>

      <Header />

      <PageTitle pageTitle="Form1" />

      <Container>
        <div className={styles.wrapper}>
          <h3 className={styles.title} data-testid="form-title">
            Form1
          </h3>

          <p className={styles.text}>あなたの名前を半角のアルファベットで入力してください。<br />小文字だった場合は大文字にして返します。</p>

          <form className={styles.form} onSubmit={submit}>
            <label htmlFor="name" className={styles.label}>
              お名前
            </label>

            <input
              id="name"
              className={styles.input}
              type="text"
              onChange={handleChange}
              placeholder="Taro Yamada"
              data-testid="name"
              autoComplete="off"
            />

            <button
              className={styles.button}
              data-testid="submit"
              type="submit"
              name="Sign Up"
              disabled={!isClickable}
            >
              送信する
            </button>
          </form>

          {convertedData && (
            <div className={styles.result} data-testid="result-area">
              <p>あなたの名前を大文字に変換しました！<br />{convertedData}</p>
            </div>
          )}
        </div>

        <section className={descStyles.description}>
          <Description>
            <p>Form1の構成は極力シンプルにしました（シンプルにしたというより、本番環境でちゃんと動作するかを確認することが目的）。テキストボックスに文字列を入力し送信ボタンを押すと、小文字のアルファベットが大文字に変換され表示される、というものです。</p>

            <p>フロントエンドではuseStateで入力値を管理し、fetch関数でAPIを叩いています。React Hook FormもZodも使っていないシンプルな構成です。</p>

            <p>バックエンドではNext.jsのAPI Routeの機能を用いてAPIエンドポイントを作成し、そこで大文字への変換を行いJSONとして返しています。</p>

            <p>テストコードは<a href="https://github.com/kento-yoshidu/MyForms/blob/main/__tests__/form1.test.tsx">こちら</a>です。テストは、</p>

            <ol>
              <li>初回レンダリング時、変換結果が表示されるエリアに何も表示されていないこと</li>
              <li>何も文字が入力されていない時、ボタンがdisabledになっていること</li>
              <li>文字が入力されている時、ボタンがdisabledになっていないこと</li>
              <li>フォームに名前を入力し送信ボタンを押すことで、大文字になった名前が表示されること</li>
            </ol>

            <p>のみを行っています。</p>
          </Description>
        </section>
      </Container>

      <HomeLink />
    </>
  )
}

export default Form1

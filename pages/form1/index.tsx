import React, { useState } from "react"
import Container from "../../components/container"
import Header from "../../components/header"
import PageTitle from "../../components/pageTitle"

import styles from "./style.module.css"

const Form1 = () => {
  const [name, setName] = useState("")
  const [data, setData] = useState("")
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
      setData(result.name)
    }
  }

  return (
    <>
      <Header />

      <PageTitle pageTitle="Form 1" />

      <Container>
        <div className={styles.wrapper}>
          <h3
            className={styles.title}
            data-testid="form-title"
          >Form1</h3>

          <p className={styles.text}>あなたの名前を半角のアルファベットで入力してください。<br />小文字だった場合は大文字にして返します。</p>

          <form
            className={styles.form}
            onSubmit={submit}
          >
            <label
              htmlFor="name"
              className={styles.label}
            >
              お名前
            </label>

            <input
              id="name"
              className={styles.input}
              type="text"
              // pattern="[0-9A-Za-z !@_#$*]*"
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

          {data && (
            <div
              className={styles.result}
              data-testid="result"
            >
              <p>あなたの名前を大文字に変換しました！<br />{data}</p>
            </div>
          )}
        </div>

        <section className={styles.section}>
          <h3>こぼれ話</h3>

          <p>Form1の構成はシンプルです。フォームの機能としては、テキストボックスに名前（アルファベット）を入力し送信ボタンを押すと、名前が大文字で表示される、というものです。</p>

          <p>フロントエンドではReactのuseStateで名前の値を管理し、fetch関数でAPIを叩いています。React Hook FormsもZodも使っていないシンプルな構成です。</p>

          <p>バックエンドではNext.jsのAPI Routeの機能を用いてAPIエンドポイントを作成し、そこで大文字への変換を行いJSONとして返しています。</p>

          <p>テストコードはこちらです。テストは、</p>

          <ol>
            <li>初回レンダリング時、変換結果が表示されるエリアに何も表示されていないこと</li>
            <li>フォームに名前を入力し送信ボタンを押すことで、大文字になった文字列が表示されること</li>
          </ol>
          <p>のみを行っています。</p>
        </section>
      </Container>
    </>
  )
}

export default Form1

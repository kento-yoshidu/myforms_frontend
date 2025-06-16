import React, { useState } from "react"
import Container from "../../components/container"
import Header from "../../components/header"
import PageTitle from "../../components/page-header"
import HomeLink from "../../components/home-link"
import PageLink from "../../components/page-link"
import styles from "./style.module.css"
import Description from "../../components/description"
import Meta from "../../components/meta"
import { toast } from "sonner"

const Form1 = () => {
  const [name, setName] = useState("")
  const [convertedData, setConvertedData] = useState("")
  const [isInputValid, setIsInputValid] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)

    const trimmedName = e.target.value.trim()

    if (trimmedName.length > 0) {
      setIsInputValid(true)
    } else {
      setIsInputValid(false)
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/form1`, {
      method: "POST",
      body: JSON.stringify({
        name,
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (data.status === 200) {
      const result = await data.json()
      setConvertedData(result.name)

      toast.success(
        <span style={{ display: "block", width: "100%", textAlign: "center" }}>
          {result.message}
        </span>
      )
    }
  }

  return (
    <>
      <Meta
        pageTitle="Form1"
        pageDesc="入力された名前を大文字にして返すフォームです。"
      />

      <Header />

      <PageTitle
        pageTitle="Form1"
        postdate="2023-02-01"
        update="2023-05-20"
      />

      <Container>
        <div className={styles.wrapper}>
          <h3
            id="form-title"
            className={styles.title}
          >
            名前変換フォーム(ver1.0)
          </h3>

          <p className={styles.text}>あなたの名前を半角のアルファベットで入力し、「変換する」ボタンをクリックしてください。</p>
          <p className={styles.text}>小文字を大文字に変換して表示します。</p>

          <form
            className={styles.form}
            aria-labelledby="form-title"
            onSubmit={submit}
          >
            <label htmlFor="name" className={styles.label}>
              お名前 <span>※必須</span>
            </label>

            <input
              id="name"
              className={styles.input}
              type="text"
              onChange={handleChange}
              placeholder="Taro Yamada"
              required
              aria-required="true"
            />

            <button
              className={styles.button}
              type="submit"
              disabled={!isInputValid}
              aria-disabled={!isInputValid}
            >
              変換する
            </button>
          </form>

          {convertedData && (
            <div className={styles.result} data-testid="result-area">
              <p>あなたの名前を大文字に変換しました！<br />{convertedData}</p>
            </div>
          )}
        </div>

        <Description>
          <p>Form1の構成は極力シンプルにしました（シンプルにしたというより、本番環境でちゃんと動作するかを確認することが目的）。テキストボックスに文字列を入力し送信ボタンを押すと、小文字のアルファベットが大文字に変換され表示される、というものです。</p>

          <p>フロントエンドではuseStateで入力値を管理し、fetch関数でAPIを叩いています。React Hook FormもZodも使っていないシンプルな構成です。</p>

          <p>テストコードは<a href="https://github.com/kento-yoshidu/MyForms/blob/main/__tests__/form1.test.tsx">こちら</a>です。テストは、</p>

          <ol>
            <li>初回レンダリング時、変換結果が表示されるエリアに何も表示されていないこと</li>
            <li>テキストボックスに何も文字が入力されていない時、送信ボタンがdisabledになっていること</li>
            <li>テキストボックスに文字（半角スペースのみ除く）が入力されている時、送信ボタンがdisabledになっていないこと</li>
            <li>テキストボックスに名前を入力し送信ボタンを押すことで、大文字になった名前が表示されること</li>
          </ol>

          <p>のみを行っています。</p>
        </Description>

        <Description heading="更新履歴">
          <ul>
            <li><time dateTime="2023-05-20">2023年05月20日</time> こぼれ話への追記、誤字脱字の修正。</li>
          </ul>
        </Description>

        <PageLink next="2" />

        <HomeLink />
      </Container>
    </>
  )
}

export default Form1

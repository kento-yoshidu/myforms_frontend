import Head from "next/head"
import { useState } from "react"

import Header from "../../components/header"
import PageTitle from "../../components/page-header"
import Container from "../../components/container"

import styles from "../form1/style.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import PageLink from "../../components/page-link"
import HomeLink from "../../components/home-link"
import Description from "../../components/description"

const Form6 = () => {
  const [name, setName] = useState("")
  const [convertedName, setConvertedName] = useState("")
  const [isInputValid, setIsInputValid] = useState(true)
  const [isFormValid, setIsFormValid] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim())

    if (e.target.validity.valid && e.target.value.trim().length !== 0) {
      setIsInputValid(true)
      setIsFormValid(true)
    } else if (e.target.value.trim().length === 0) {
      setIsInputValid(true)
      setIsFormValid(false)
    } else {
      setIsInputValid(false)
      setIsFormValid(false)
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch("/api/form1", {
      method: "POST",
      body: JSON.stringify(name),
      headers: { "Content-Type": "application/json" }
    })

    const result = await data.json()
    setConvertedName(result.name)
  }

  return (
    <>
      <Head>
        <title>Form6 | My Forms</title>
      </Head>

      <Header />

      <PageTitle
        pageTitle="Form6"
        postdate="2023-05-14"
        update="2023-05-26"
      />

      <Container>
        <div className={styles.wrapper}>
          <h3
            id="form-title"
            className={styles.title}
          >
            名前変換フォーム(ver1.2)
          </h3>

          <p className={styles.text}>あなたの名前を半角小文字アルファベットで入力し、「変換する」ボタンをクリックしてください。名前を大文字に変換して表示します。</p>

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
              placeholder="taro yamada"
              pattern="^[a-z ]+$"
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={!isInputValid}
            />

            <p className={styles.notice}>
              {/* @ts-ignore */}
              <FontAwesomeIcon icon={faCircleExclamation} />
              半角小文字アルファベット、半角スペースのみ
            </p>

            {!isInputValid && (
              <p
                className={styles.errorMessage}
                data-testid="error-message"
              >
                半角小文字アルファベットと半角スペースのみ入力可能です。
              </p>
            )}

            <button
              className={styles.button}
              type="submit"
              disabled={!isFormValid}
            >
              変換する
            </button>
          </form>

        {convertedName && (
          <section className={styles.result} data-testid="result-area">
            <p>あなたの名前を大文字に変換しました！<br />{convertedName}</p>
          </section>
        )}
        </div>

        <Description>
          <p>Form1、Form2と同じく、入力した半角小文字アルファベットを大文字にして表示するフォームです。それらは半角小文字アルファベット以外（ここでは「変換不可文字」と呼びます）も入力し送信可能でしたが、今回は変換不可文字が混じっている時はそもそもフォームを送信できない仕様にしています。</p>
          <p>また、変換不可文字を入力すると、その時点で「<span style={{ "color": "rgb(220, 50, 50)" }}>半角小文字アルファベットと半角スペースのみ入力可能です。</span>」と表示され、さらにテキストボックスのborderが赤くなります。これが本当のリアルタイムバリデーションですね。</p>

          <p>テストコードは<a href="https://github.com/kento-yoshidu/MyForms/blob/main/__tests__/form6.test.tsx">こちら</a>です。テストに関して特筆すべきことはしていないので省略します。</p>

          <p>ただ、今回はARIA属性を絡めたコードを書いているので補足します。</p>

          <p>フォームに入力された値が変換不可文字を含んでいる場合、useStateを用いて<em>aria-invalid属性</em>の値をtrueにするようにコードを書いています。</p>
          <p>aria-invalid属性とは何でしょうか？私も詳しくは説明できないので仕様書を読んでほしいのですが（<a href="https://www.w3.org/TR/wai-aria-1.1/#aria-invalid" target="_blink">WAI-ARIAの仕様書</a>）、入力された値が不正な場合は値をtrueにして、その旨をユーザーや支援技術に知らせるaria属性である、と読み取りました。</p>

          <p>そしてCSSでは、このaria-invalid属性の値に応じてスタイルを返るようにしています（コードは<a href="https://github.com/kento-yoshidu/MyForms/blob/053eda05aa5c9b2e9fb51ae4a16c4ee8a16e9435/pages/form1/style.module.css#L91-L95" target="_blink">こちら</a>）。WAI-ARIAを勉強するまでの私なら「.validate-error」などといったCSSクラスを付与してスタイルを切り替えてしまっていた所ですが、よりセマンティックになるようにCSSを書いています。</p>
        </Description>

        <Description heading="更新履歴">
          <ul>
            <li><time dateTime="2023-05-26">2023年05月26日</time>書きかけだったこぼれ話を書き上げ。</li>
            <li><time dateTime="2023-05-15">2023年05月15日</time>こぼれ話を途中まで記述。</li>
          </ul>
        </Description>

        <PageLink prev="5" />

        <HomeLink />
      </Container>
    </>
  )
}

export default Form6

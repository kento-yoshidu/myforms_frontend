import Head from "next/head"
import Header from "../../components/header"
import PageTitle from "../../components/page-header"
import Container from "../../components/container"

import styles from "../form1/style.module.css"
import { useState } from "react"
import Description from "../../components/description"
import PageLink from "../../components/page-link"
import HomeLink from "../../components/home-link"

const Form4 = () => {
  const [email, SetEmail] = useState("")
  const [isInputValid, setIsInputValid] = useState(true)
  const [isFormValid, setIsFormValid] = useState(false)
  const [returnedData, setReturnedData] = useState(null)

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.validity.valid) {
      setIsInputValid(true)
    } else {
      setIsInputValid(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetEmail(e.target.value)

    if (e.target.validity.valid && e.target.value) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }

  const handleFocus = () => {
    setIsInputValid(true)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch("/api/form3", {
      method: "POST",
      body: JSON.stringify(email),
      headers: { 'Content-Type': 'application/json' }
    })

    if (data.status === 200) {
      const { email } = await data.json()

      setReturnedData(email)
    }
  }

  return (
    <>
      <Head>
        <title>Form4 | My Forms</title>
      </Head>

      <Header />

      <PageTitle
        pageTitle="Form4"
        postdate="2023-05-04"
        update="2023-05-04"
      />

      <Container>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>メールアドレス登録フォーム</h3>

          <p className={styles.text}>利用するメールアドレスを入力してください（適当なアドレスでOKです。ただ、バリデーションがかかりますので、形式は正しいものにしてください）。</p>

          <form className={styles.form} onSubmit={submit}>
            <label htmlFor="email" className={styles.label}>
              メールアドレス <span>(※必須)</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="dummy@example.com"
              data-testid="email"
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />

            {!isInputValid && (
              <p
                className={styles.errorMessage}
                data-testid="error-message"
              >
                メールアドレスの形式が正しくありません。
              </p>
            )}

            <button
              className={styles.button}
              data-testid="submit"
              type="submit"
              name="Sign Up"
              disabled={!isFormValid}
            >
              送信する
            </button>
          </form>

          {returnedData && (
            <div className={styles.result} data-testid="result-area">
              あなたが設定したメールアドレスは<br />
                {returnedData}
              ですね！
            </div>
          )}
        </div>

        <Description>
          <p>今回はメールアドレスがテーマです。これまでは入力された文字列のバリデーションを行ってきませんでしたが、今回は入力された内容が正しいかをちゃんとチェックします。</p>

          <p>メールアドレスのバリデーションは、input要素のtypeをemailとすればHTML側で行ってくれます。具体的には、アドレスの形式が正しければe.target.validity.validがtrueになり、正しくなければfalseになります。これをonChangeで都度確認します。</p>

          <p>HTML標準でこういう機能を提供してくれるのはありがたいですね。この正規表現も完璧なものではないらしいですが、今回はありがたく利用しましょう。</p>

          <p>テストコードは実装中です。</p>
        </Description>

        <PageLink prev="3" />

        <HomeLink />
      </Container>
    </>
  )
}

export default Form4

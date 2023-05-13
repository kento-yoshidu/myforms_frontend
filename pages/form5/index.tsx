import Head from "next/head"
import Header from "../../components/header"
import PageTitle from "../../components/page-header"
import Container from "../../components/container"

import styles from "../form1/style.module.css"
import { useState } from "react"
import Description from "../../components/description"
import PageLink from "../../components/page-link"
import HomeLink from "../../components/home-link"
import Meta from "../../components/meta"

export type UserData = {
  username: string
  email: string
}

const Form4 = () => {
  const [formData, setFormData] = useState<UserData>({
    username: "",
    email: ""
  })
  // username, emailがちゃんと入力されているか
  const [isInputForm, setIsInputForm] = useState({
    username: true,
    email: true
  })
  // フォーム全体として送信可能な状態か
  const [isFormValid, setIsFormValid] = useState(false)
  const [returnedData, setReturnedData] = useState<UserData | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    const trimmedValue = value.trim()

    const data = {...formData, [name]: trimmedValue}

    setFormData(data)

    checkFormValid(data, e.target.validity.valid)
  }

  // 入力内容から送信ボタンのON/OFFを切り替える
  const checkFormValid = ({ username, email }: UserData, emailValid: boolean) => {
    if (username && email && emailValid) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }

  // フォームのフォーカスを外した時、エラーメッセージの表示/非表示を切り替える
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, validity } = e.target

    // Todo : validity.validでリファクタ
    // Todo : この辺換数に切り出せない？
    if (name === "username") {
      if (value.trim().length !== 0) {
        setIsInputForm((prevState) => ({...prevState, username: true}))
      } else {
        setIsInputForm((prevState) => ({...prevState, username: false}))
      }
    }

    if (name === "email") {
      if (value && validity.valid) {
        setIsInputForm((prevState) => ({...prevState, email: true}))
      } else {
        setIsInputForm((prevState) => ({...prevState, email: false}))
      }
    }
  }

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsInputForm((prevState) => ({...prevState, [e.target.name]: true}))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch("/api/form4", {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (data.status === 200) {
      const { username, email } = await data.json()

      setReturnedData({ username, email })
    }
  }

  return (
    <>
      <Meta pageTitle="Form5" />

      <Header />

      <PageTitle
        pageTitle="Form5"
        postdate="2023-05-07"
        update="2023-05-07"
      />

      <Container>
        <div className={styles.wrapper}>
          <h3
            id="form-title"
            className={styles.title}
          >
            ユーザー登録フォーム
          </h3>

          <p className={styles.text}>ユーザー名とメールアドレスを入力し、ユーザー登録するボタンをクリックしてください。</p>

          <form
            className={styles.form}
            aria-labelledby="form-title"
            onSubmit={submit}
          >

            <label htmlFor="username" className={styles.label}>
              ユーザー名 <span>(※必須)</span>
            </label>

            <input
              id="username"
              name="username"
              className={styles.input}
              placeholder="username"
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              required
              aria-required
            />
            {!isInputForm.username && (
              <p
                className={styles.errorMessage}
                data-testid="username-error-message"
              >
                ユーザー名を入力してください。
              </p>
            )}

            <label htmlFor="email" className={styles.label}>
              メールアドレス <span>(※必須)</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="dummy@example.com"
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              required
              aria-required
            />

            {!isInputForm.email && (
              <p
                className={styles.errorMessage}
                data-testid="email-error-message"
              >
                メールアドレスを正しく入力してください。
              </p>
            )}

            <button
              className={styles.button}
              type="submit"
              disabled={!isFormValid}
              aria-disabled={!isFormValid}
            >
              ユーザー登録する
            </button>
          </form>

          {returnedData && (
            <section className={styles.result} data-testid="result-area">
              <p>ユーザー名 : <span data-testid="result-username">{returnedData.username}</span></p>
              <p>メールアドレス : <span data-testid="result-email">{returnedData.email}</span></p>
              <p>でユーザー登録を行いました。</p>
            </section>
          )}
        </div>

        <Description>
          <p>これまでのフォームは入力項目が一つでしたが、今回は二つ存在します。項目が一つなら単純にuseStateで状態管理できますが、項目が増えるにつれ、それぞれを個別のstateで管理しようとすると思ったよりもコードが複雑になります。</p>

          <p>今回は項目が二つだけのため、項目それぞれの状態をフィールドにしたオブジェクトで状態管理しています。二つでも結構大変なため、数が多くなってきたらReact Hook Formなどのライブラリーの力を借りた方がよさそうです。</p>

          <p>テストコードは<a href="https://github.com/kento-yoshidu/MyForms/blob/main/__tests__/form5.test.tsx">こちら</a>です。</p>

          <p>テストケースが15個になってしまったため、ここでの説明は割愛します。テストを大きく分類すると、</p>

          <ol>
            <li>初回レンダリング時、送信ボタンがdisabledになっていたり、エラーメッセージが表示されていないこと</li>
            <li>必須項目を埋めると送信ボタンのdisabledが解除されること</li>
            <li>無効な値を入力しフォーカスを外した時、エラーメッセージが表示されること</li>
          </ol>

          <p>という風になります。</p>

        </Description>

        <PageLink prev="4" />

        <HomeLink />
      </Container>
    </>
  )
}

// https://www.freecodecamp.org/news/how-to-validate-forms-in-react/

export default Form4

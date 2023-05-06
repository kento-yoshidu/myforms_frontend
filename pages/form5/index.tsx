import Head from "next/head"
import Header from "../../components/header"
import PageTitle from "../../components/page-header"
import Container from "../../components/container"

import styles from "../form1/style.module.css"
import { useState } from "react"
import Description from "../../components/description"
import PageLink from "../../components/page-link"
import HomeLink from "../../components/home-link"

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

    const data = {...formData, [name]: value}

    setFormData(data)

    checkValid(data, e.target.validity.valid)
  }

  // 入力内容から送信ボタンのON/OFFを切り替える
  const checkValid = ({ username, email }: UserData, emailValid: boolean) => {
    if (username && email && emailValid) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }

  // フォームのフォーカスを外した時、エラーメッセージの表示/非表示を切り替える
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, validity } = e.target

    if (name === "username") {
      if (value) {
        setIsInputForm((prevState) => ({...prevState, username: true}))
      } else {
        setIsInputForm((prevState) => ({...prevState, username: false}))
      }
    }

    if (name === "email") {
      if (value && validity.valid) {
        setIsInputForm((prevState) => ({...prevState, "email": true}))
      } else {
        setIsInputForm((prevState) => ({...prevState, "email": false}))
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
      <Head>
        <title>Form4 | My Forms</title>
      </Head>

      <Header />

      <PageTitle
        pageTitle="Form5"
        postdate="2099-01-01"
        update="2099-01-01"
      />

      <Container>
        <div className={styles.wrapper}>
          <h3
            className={styles.title}
            data-testid="form5"
          >
            ユーザー登録フォーム
          </h3>

          <p className={styles.text}>ユーザー名とメールアドレスを入力してください。</p>

          <form className={styles.form} onSubmit={submit}>

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
              data-testid="username"
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
              data-testid="email"
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
              data-testid="submit"
            >
              ユーザー登録する
            </button>
          </form>

          {returnedData && (
            <section className={styles.result} data-testid="result-area">
              <p>ユーザー名 : {returnedData.username}</p>
              <p>メールアドレス : {returnedData.email}</p>
              <p>でユーザー登録を行いました。</p>
            </section>
          )}
        </div>

        <Description>
          <p>これまでのフォームは全て、必須項目を全て入力しないとボタンを押せない仕様になっていました。具体的にはbutton要素にdisabled属性を付与することでボタンを無効化していました。</p>

          <p>しかし、</p>

          <p>個人的には「送信した後に間違いがあることが分かり、」よりかは、「入力を終わらせないと送信できない」方がユーザー体験はいいと思っているので、基本的にはdisabled属性を付与する機会の方が多いかと思います。ただ、そのためには「送信ボタンを押そうとして、ボタンが無効化されていることに気づく」前に、さもなくば、「入力を終わらせたはずなのに何故かボタンが押せない」状態になっていまいます。</p>

          <p>そこで色々な企業のWebサイトの問い合わせフォームを確認してみると、体感9割以上は「必須項目を入力しなくてもボタンが押せる」仕様になっていました。</p>

          <p>ただ、ボタンが押せるといっても、押したときの挙動は様々です。そもそもエラーメッセージすら表示されないサイトが大半でした。</p>
        </Description>

        <PageLink prev="4" />

        <HomeLink />
      </Container>
    </>
  )
}

// https://www.freecodecamp.org/news/how-to-validate-forms-in-react/

export default Form4

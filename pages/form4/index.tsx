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

    if (e.target.validity.valid) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
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
        postdate="2099-01-01"
        update="2099-01-01"
      />

      <Container>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>メールアドレス登録フォーム</h2>

          <p className={styles.text}>メールアドレスを入力してください。</p>

          <form className={styles.form} onSubmit={submit}>

            <label htmlFor="email" className={styles.label}>
              メールアドレス <span>(※必須)</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="kent"
              data-testid="email"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {!isInputValid && (
              <p>正しくない</p>
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
            <p>{returnedData}</p>
          )}
        </div>

        <Description>
          <p>これまでのフォームは全て、必須項目を全て入力しないとボタンを押せない仕様になっていました。具体的にはbutton要素にdisabled属性を付与することでボタンを無効化していました。</p>

          <p>しかし、</p>

          <p>個人的には「送信した後に間違いがあることが分かり、」よりかは、「入力を終わらせないと送信できない」方がユーザー体験はいいと思っているので、基本的にはdisabled属性を付与する機会の方が多いかと思います。ただ、そのためには「送信ボタンを押そうとして、ボタンが無効化されていることに気づく」前に、さもなくば、「入力を終わらせたはずなのに何故かボタンが押せない」状態になっていまいます。</p>

          <p>そこで色々な企業のWebサイトの問い合わせフォームを確認してみると、体感9割以上は「必須項目を入力しなくてもボタンが押せる」仕様になっていました。</p>

          <p>ただ、ボタンが押せるといっても、押したときの挙動は様々です。そもそもエラーメッセージすら表示されないサイトが大半でした。</p>
        </Description>

        <PageLink prev="3" />

        <HomeLink />
      </Container>
    </>
  )
}

/* https://azukiazusa.dev/blog/use-aria-disabled-to-give-focus-to-disabled-button/ */

/* https://yutaro-blog.net/2021/10/22/react-state-tips/ */

export default Form4

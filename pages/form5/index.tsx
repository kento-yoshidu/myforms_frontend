import Head from "next/head"
import Header from "../../components/header"
import PageTitle from "../../components/page-header"
import Container from "../../components/container"

import styles from "../form1/style.module.css"
import { useState } from "react"
import Description from "../../components/description"

export type UserData = {
  username: string
  email: string
}

const Form4 = () => {
  const [formData, setFormData] = useState<UserData>({
    username: "",
    email: ""
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const [returnedData, setReturnedData] = useState<UserData | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.validity.valid)
    const { name, value } = e.target

    const data = {...formData, [name]: value}

    setFormData(data)

    checkValid(data, e.target.validity.valid)
  }

  const checkValid = ({ username, email}: UserData, emailValid: boolean) => {
    if (username && email && emailValid) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch("/api/form3", {
      method: "POST",
      body: JSON.stringify(formData),
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
        pageTitle="Form4"
        postdate="2099-01-01"
        update="2099-01-01"
      />

      <Container>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>ユーザー登録フォーム</h2>

          <p className={styles.text}>ユーザー名とメールアドレスを入力してください。</p>

          <form className={styles.form} onSubmit={submit}>

            <label htmlFor="username" className={styles.label}>
              ユーザー名 <span>(※必須)</span>
            </label>

            <input
              id="username"
              name="username"
              className={styles.input}
              placeholder="kent"
              onChange={handleChange}
              data-testid="username"
            />

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
            />

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
            <>
              <p>{returnedData.username}</p>
              <p>{returnedData.email}</p>
            </>
          )}
        </div>

        <Description>
          <p>これまでのフォームは全て、必須項目を全て入力しないとボタンを押せない仕様になっていました。具体的にはbutton要素にdisabled属性を付与することでボタンを無効化していました。</p>

          <p>しかし、</p>

          <p>個人的には「送信した後に間違いがあることが分かり、」よりかは、「入力を終わらせないと送信できない」方がユーザー体験はいいと思っているので、基本的にはdisabled属性を付与する機会の方が多いかと思います。ただ、そのためには「送信ボタンを押そうとして、ボタンが無効化されていることに気づく」前に、さもなくば、「入力を終わらせたはずなのに何故かボタンが押せない」状態になっていまいます。</p>

          <p>そこで色々な企業のWebサイトの問い合わせフォームを確認してみると、体感9割以上は「必須項目を入力しなくてもボタンが押せる」仕様になっていました。</p>

          <p>ただ、ボタンが押せるといっても、押したときの挙動は様々です。そもそもエラーメッセージすら表示されないサイトが大半でした。</p>
        </Description>
      </Container>
    </>
  )
}

/* https://azukiazusa.dev/blog/use-aria-disabled-to-give-focus-to-disabled-button/ */

/* https://yutaro-blog.net/2021/10/22/react-state-tips/ */

export default Form4

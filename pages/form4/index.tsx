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
      <Meta pageTitle="Form4" />

      <Header />

      <PageTitle
        pageTitle="Form4"
        postdate="2023-05-04"
        update="2023-05-05"
      />

      <Container>
        <div className={styles.wrapper}>
          <h3
            id="form-title"
            className={styles.title}
          >
            メールアドレス登録フォーム
          </h3>

          <p className={styles.text}>利用するメールアドレスを入力してください（適当なアドレスでOKです。ただ、バリデーションがかかりますので、形式は正しいものにしてください）。</p>

          <form
            className={styles.form}
            aria-labelledby="form-title"
            onSubmit={submit}
          >
            <label htmlFor="email" className={styles.label}>
              メールアドレス <span>※必須</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="dummy@example.com"
              inputMode="email"
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
              type="submit"
              disabled={!isFormValid}
              aria-disabled={!isFormValid}
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
          <p>今回はメールアドレスがテーマです。これまでは入力内容のバリデーションを行ってきませんでしたが、今回は内容が正しいかをちゃんとチェックします。</p>

          <p>メールアドレスのバリデーションは、input要素のtypeをemailとすればHTML側で行ってくれます。具体的には、アドレスの形式が正しければe.target.validity.validがtrueになり、正しくなければfalseになります。これをonChangeで都度確認します。</p>

          <p>HTML標準でこういう機能を提供してくれるのはありがたいですね。この機能も完璧なものではないらしいですが、今回はありがたく利用しましょう。</p>

          <p>テストコードは<a href="https://github.com/kento-yoshidu/MyForms/blob/main/__tests__/form4.test.tsx">こちら</a>です。テストは、</p>

          <ol>
            <li>初回レンダリング時、変換結果が表示されるエリアに何も表示されていないこと</li>
            <li>初回レンダリング時、エラーメッセージが表示されていないこと</li>
            <li>初回レンダリング時、ボタンがdisabledになっていること</li>
            <li>正しいメールアドレスを入力した時、ボタンのdisabledが解除されること</li>
            <li>正しいメールアドレスを入力しフォーカスを外した時、エラーメッセージが表示されないこと</li>
            <li>正しくないメールアドレスを入力した時、ボタンがdisabledになっていること</li>
            <li>正しくないメールアドレスを入力しフォーカスを外した時、エラーメッセージが表示されること</li>
            <li>正しくないメールアドレスを入力しフォーカスを外し、再度フォーカスした時、エラーメッセージが表示されないこと</li>
            <li>正しいメールアドレスを入力し送信ボタンをクリックした時、結果が表示されるエリアに入力したメールアドレスが表示されること</li>
          </ol>

          <p>を行っています。</p>
        </Description>

        <Description heading="更新履歴">
          <ul>
            <li><time dateTime="2023-05-21">2023年05月21日</time>input要素に<code>inputMode=&ldquo;email&rdquo;</code>を付与。</li>
          </ul>
        </Description>

        <PageLink prev="3" next="5" />

        <HomeLink />
      </Container>
    </>
  )
}

export default Form4

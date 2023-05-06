import React, { useState } from "react"
import Head from "next/head"

import Container from "../../components/container"
import Header from "../../components/header"
import PageTitle from "../../components/page-header"
import HomeLink from "../../components/home-link"

import styles from "../form1/style.module.css"
import Description from "../../components/description"
import PageLink from "../../components/page-link"

const Form3 = () => {
  const [password, setPassword] = useState("")
  const [convertedData, setConvertedData] = useState("")
  const [isInputValid, setIsInputValid] = useState(false)
  const [isShowError, setIsShowError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim())

    if (e.target.value.trim().length >= 8) {
      setIsInputValid(true)
    } else {
      setIsInputValid(false)
    }
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length < 8) {
      setIsShowError(true)
    }
  }

  const handleFocus = () => {
    setIsShowError(false)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch("/api/form2", {
      method: "POST",
      body: JSON.stringify(password),
      headers: { 'Content-Type': 'application/json' }
    })

    if (data.status === 200) {
      const result = await data.json()
      setConvertedData(result.password)
    }
  }

  return (
    <>
      <Head>
        <title>Form3 | My Forms</title>
      </Head>

      <Header />

      <PageTitle
        pageTitle="Form3"
        postdate="2023-04-29"
        update="2023-05-01"
      />

      <Container>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>
            パスワード設定フォーム
          </h3>

          <p className={styles.text}>あなたのパスワードを設定します。任意のパスワード8文字を入力したら、「パスワードを設定する」ボタンをクリックしてください。</p>
          <p className={styles.text}>あなたが入力したパスワードを表示します。</p>

          <form className={styles.form} onSubmit={submit}>
            <label htmlFor="password" className={styles.label}>
              パスワード(8文字以上) <span>※必須</span>
            </label>

            <input
              id="password"
              className={styles.input}
              type="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />

            {isShowError && (
              <p className={styles.errorMessage} data-testid="error-message">パスワードは8文字必要です。</p>
            )}

            <button
              className={styles.button}
              type="submit"
              disabled={!isInputValid}
              aria-disabled={!isInputValid}
            >
              パスワードを設定する
            </button>
          </form>

          {convertedData && (
            <section className={styles.result} data-testid="result-area">
              <p>あなたが設定したパスワードは<br />
              {convertedData} <br />
              ですね！</p>
            </section>
          )}
        </div>

        <Description>
          <p>Form3では<strong>リアルタイムバリデーション</strong>を実装してみました。送信ボタンを押して初めてエラーメッセージが表示されるのではなく、送信ボタンを押す前に表示されるアレですね。</p>

          <p>しかし、<strong>入力途中</strong>でエラーメッセージが出るとイラッとします。今回の例ですと最低文字数は8文字ですから、1～7文字目を打っている間にずっとエラーメッセージが表示されるわけです。これから勉強しようとしている時に、お母さんに「勉強しなさい！」と怒られた時の感情と似ています。これは良くありませんね。</p>

          <p>さらに言うと、タイプミスして最初から入力し直す場合もあるので、入力中は黙っておいて欲しいわけです。</p>

          <p>onChangeで文字数をカウントするのは筋が悪いので、onBlurを使用することにしました。onBlurはフォーカスが外れた時に動作するイベントハンドラーです。フォーカスが外れた時に文字数をカウントして、8文字未満ならエラーメッセージを表示させます。</p>

          <p>再度フォーカスした時は無条件でエラーメッセージを消します。onFocusハンドラーでフォーカス時の動作を定義できます。</p>

          <p>しかしこれは「リアルタイム」ではないかも？とさっき思いましたが、細かいことは気にすんな。</p>

          <p>テストコードは<a href="https://github.com/kento-yoshidu/MyForms/blob/main/__tests__/form3.test.tsx">こちら</a>です。テストは、</p>

          <ol>
            <li>初回レンダリング時、入力したパスワードが表示されるエリアに何も表示されていないこと</li>
            <li>初回レンダリング時、エラーメッセージが表示されていないこと</li>
            <li>テキストボックスに文字が入力されていない時、ボタンがdisabledになっていること</li>
            <li>テキストボックスに8文字以上の文字が入力されている時、ボタンがdisabledになっていないこと</li>
            <li>テキストボックスに7文字以下の入力してからフォーカスを外した時、エラーメッセージが表示されること</li>
            <li>テキストボックスに7文字以下の入力してからフォーカスを外し、再度フォーカスした時、エラーメッセージが表示されないこと</li>
            <li>テキストボックスに8文字以上の入力してからフォーカスを外した時、エラーメッセージが表示されないこと</li>
            <li>テキストボックスに文字を入力し設定ボタンをクリックした時、入力した文字と同じ文字が表示されること</li>
          </ol>

          <p>を行っています。</p>
        </Description>

        <PageLink prev="2" next="4" />

        <HomeLink />
      </Container>
    </>
  )
}

export default Form3

import Head from "next/head"
import Header from "../../components/header"
import PageTitle from "../../components/pageTitle"
import Container from "../../components/container"

import styles from "../form1/style.module.css"
import { useState } from "react"

const Form4 = () => {
  const [text, setText] = useState("")
  const [isInputValid, setIsInputValid] = useState(false)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && text) {
      setIsInputValid(true)
    } else {
      setIsInputValid(false)
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
      // setConvertedData(result.name)
    }
  }

  return (
    <>
      <Head>
        <title>Form4 | My Forms</title>
      </Head>

      <Header />

      <PageTitle pageTitle="Form4" />

      <Container>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Form4</h2>

          <p className={styles.text}>あなたの名前を半角のアルファベットで入力し、「変換する」ボタンをクリックしてください。</p>
          <p className={styles.text}>小文字を大文字に変換して表示します。</p>

          <form className={styles.form} onSubmit={submit}>

            <label htmlFor="name" className={styles.label}>
              感想 <span>※必須</span>
            </label>

            <textarea
              id="name"
              className={styles.input}
              placeholder="Taro Yamada"
              data-testid="name"
              autoComplete="off"
              required
              aria-required="true"
              onChange={handleTextChange}
            />

            <label htmlFor="check">確認しました</label>
            <input
              id="check"
              type="checkbox"
              onChange={handleChange}
            />

            <button
              className={styles.button}
              data-testid="submit"
              type="submit"
              name="Sign Up"
              disabled={!isInputValid}
            >
              送信する
            </button>
          </form>
        </div>
      </Container>
    </>
  )
}

export default Form4

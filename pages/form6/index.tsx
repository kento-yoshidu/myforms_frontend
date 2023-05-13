import Head from "next/head"
import Header from "../../components/header"
import PageTitle from "../../components/page-header"
import Container from "../../components/container"

import styles from "../form1/style.module.css"
import { useState } from "react"

const Form6 = () => {
  const [name, setName] = useState("")
  const [convertedName, setConvertedName] = useState("")
  const [isInputValid, setIsInputValid] = useState(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim())

    if (e.target.validity.valid && e.target.value.trim().length !== 0) {
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
        postdate="2099-01-01"
        update="2099-01-01"
      />

      <Container>
        <div className={styles.wrapper}>
          <h3
            id="form-title"
            className={styles.title}
          >
            名前変換フォーム(ver1.2)
          </h3>

          <p className={styles.text}></p>

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

            <p className={styles.notice}>お名前は半角小文字アルファベットで入力してください。</p>

            {!isInputValid && (
              <p>半角小文字アルファベットと半角スペースのみ入力可能です。</p>
            )}

            <button
              className={styles.button}
              type="submit"
              disabled={!isInputValid}
            >
              送信する
            </button>
          </form>

        {convertedName && (
          <section className={styles.result} data-testid="result-area">
            <p>{convertedName}</p>
          </section>
        )}
        </div>
      </Container>
    </>
  )
}

export default Form6

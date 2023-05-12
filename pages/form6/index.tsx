import Head from "next/head"
import Header from "../../components/header"
import PageTitle from "../../components/page-header"
import Container from "../../components/container"

import styles from "../form1/style.module.css"
import { useEffect, useState } from "react"

const Form6 = () => {
  const [name, setName] = useState("")
  const [convertedName, setConvertedName] = useState("")
  const [isInputValid, setIsInputValid] = useState(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim())

    setIsInputValid(e.target.validity.valid)
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
          <h2 className={styles.title}>名前変換フォーム(ver1.2)</h2>

          <p className={styles.text}></p>

          <form className={styles.form} onSubmit={submit}>

            <label htmlFor="name" className={styles.label}>
              お名前 <span>※必須</span>
            </label>

            <input
              id="name"
              className={styles.input}
              placeholder="Taro Yamada"
              pattern="[a-z]+"
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={!isInputValid}
            />

            {!isInputValid && (
              <p>エラーです。</p>
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

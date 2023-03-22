import React, { useState } from "react"
import Head from "next/head"

import Header from "../../components/header"

import FormInput from "./FormInput"

import styles from "./style.module.css"
import PageTitle from "../../components/pageTitle"

const Forms1 = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [username, setUsername] = useState<string | null>(null)

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "userId",
      errorMessage: "ユーザー名は3-16文字のアルファベットと数字です。記号は使用できません。",
      label: "ユーザー名",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "example@myform.com",
      errorMessage: "メールアドレスの形式が正しくありません。",
      label: "メールアドレス",
      required: true
    }, {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 spacial character. ",
      label: "パスワード",
      pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}",
      required: true
    }, {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "パスワード（確認用）",
      errorMessage: "Password don't match!",
      label: "パスワード（確認用）",
      pattern: values.password,
      required: true
    }
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = await fetch("/api/form1", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" }
    })

    const { username, email } = await data.json()

    setUsername(username)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Head>
        <title>Form1</title>
      </Head>

      <Header />

      <PageTitle pageTitle="Form 1" />

      <div className={styles.app}>
        <h3 className={styles.formTitle}>ユーザー登録</h3>

        <form onSubmit={handleSubmit}>
          {inputs.map((input) => {
            return (
              <FormInput
                key={input.id}
                {...input}
                /* @ts-ignore */
                value={values[input.name]}
                onChange={onChange}
              />
            )
          })}

          <button
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>

      {username && (
        <div className={styles.message}>
          <p>こんにちは {username}さん、ユーザー登録が完了しました。</p>
        </div>
      )}

    </>
  )
}

export default Forms1

// https://www.youtube.com/watch?v=tIdNeoHniEY&t=1537s

// https://giancarlobuomprisco.com/next/handling-api-errors-in-nextjs

// https://zenn.dev/takepepe/articles/fetch-error-convolution

// https://www.geeksforgeeks.org/does-react-usestate-hook-update-immediately/

// https://www.telerik.com/blogs/how-to-create-validate-react-form-hooks

// https://refine.dev/blog/common-usestate-mistakes-and-how-to-avoid/

// https://www.codevertiser.com/react-forms-best-practices/

// https://sergiodxa.com/articles/react-working-with-forms

import React, { useState } from "react"
import FormInput from "./FormInput"

import styles from "./style.module.css"

type Values = {
  username: string
  email: string
  birthday: string
  password: string
  confirmPassword: string
}

const Forms1 = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: ""
  })

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username should be 3-16 characters and shouldn't include any special character.",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Username should be 3-16 characters.",
      label: "Email",
      required: true
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday"
    }, {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 spacial character. ",
      label: "Password",
      pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}",
      required: true
    }, {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "ConfirmPassword",
      errorMessage: "Password don't match!",
      label: "ConfirmPassword",
      pattern: values.password,
      required: true
    }
  ]


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  console.log(values)

  return (
    <div className={styles.app}>
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => {
          return (
            /* @ts-ignore */
            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
          )
        })}
        <button>Submit</button>
      </form>
    </div>
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

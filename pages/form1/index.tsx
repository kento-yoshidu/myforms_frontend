import { notDeepStrictEqual } from "assert"
import React, { useState } from "react"
import FormInput from "./FormInput"

import Styles from "./style.module.css"

type Values = {
  username: string
  email: string
  birthday: string
  password: string
  conformPassword: string
}

const inputs = [
  {
    id: 1,
    name: "username",
    type: "text",
    placeholder: "Username",
    label: "Username"
  },
  {
    id: 2,
    name: "email",
    type: "text",
    placeholder: "Email",
    label: "Email"
  },
  {
    id: 3,
    name: "birthday",
    type: "text",
    placeholder: "Birthday",
    label: "Birthday"
  }, {
    id: 4,
    name: "password",
    type: "text",
    placeholder: "Password",
    label: "Password"
  }, {
    id: 5,
    name: "confirmPassword",
    type: "text",
    placeholder: "ConfirmPassword",
    label: "ConfirmPassword"
  }
]

const Forms1 = () => {
  const [values, setValues] = useState<any>({})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  return (
    <div className={Styles.app}>
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
      <button type="submit">送信</button>
      </form>
    </div>
  )
}

export default Forms1

// https://giancarlobuomprisco.com/next/handling-api-errors-in-nextjs

// https://zenn.dev/takepepe/articles/fetch-error-convolution

// https://www.geeksforgeeks.org/does-react-usestate-hook-update-immediately/

// https://www.telerik.com/blogs/how-to-create-validate-react-form-hooks

// https://refine.dev/blog/common-usestate-mistakes-and-how-to-avoid/

// https://www.codevertiser.com/react-forms-best-practices/

// https://sergiodxa.com/articles/react-working-with-forms
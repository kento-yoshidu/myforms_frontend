import React, { FormEventHandler, useRef, useState } from "react"
import FormInput from "./FormInput"

import styles from "./style.module.css"

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
    errorMessage: "Username should be 3-16 characters and shouldn't include any special character.",
    label: "Username"
  },
  {
    id: 2,
    name: "email",
    type: "text",
    placeholder: "Email",
    errorMessage: "Username should be 3-16 charactors.",
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
  // const [username, setUsername] = useState("")
  const usernameRef = useRef()

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  
    console.log("---", usernameRef)
  }

  return (
    <div className={styles.app}>
      <form onSubmit={handleSubmit}>
        <FormInput
          placeholder="Username"
          refer={usernameRef}
        />

        <FormInput placeholder="Email"/>
        <FormInput placeholder="Full Name"/>
        <FormInput placeholder="Sth else"/>

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

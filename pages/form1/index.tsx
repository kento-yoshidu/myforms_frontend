import React, { useEffect, useState, useRef } from "react"
import Layout from '../components/Layout'
import FormInput from "./FormInput"

import Styles from "./style.module.css"

const Forms1 = () => {
  // const [username, setUsername] = useState("")

  const usernameRef = useRef()

  console.log("username is", usernameRef)

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(usernameRef)
  }

  return (
      <div className={Styles.app}>
        <form onSubmit={handleSubmit}>
          <FormInput
            refer={usernameRef}
            placeholder="Username"
          />

          {/*
          <FormInput placeholder="Email" />
          <FormInput placeholder="FullName" />
          <FormInput placeholder="Sth else" />
  */}

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

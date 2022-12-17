import React from "react"
import Styles from "./input.module.css"

type Props = {
  placeholder: string,
  refer: any
}

const FormInput = ({ placeholder, refer }: Props) => {
  return (
    <div className={Styles.formInput}>
      {/* <label>Username</label> */}

      <input
        ref={refer}
        className={Styles.input}
        placeholder={placeholder}
      /> 
    </div>
  )
}

export default FormInput

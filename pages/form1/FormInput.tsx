import React, { RefObject } from "react"
import styles from "./form-input.module.css"

type Props = {
  placeholder: string,
  name: string
  refer: RefObject<HTMLInputElement>
}

const FormInput = ({ placeholder, refer }: Props) => {
  return (
    <div className={styles.formInput}>
      <label className={styles.label}>Username</label>

      <input
        className={styles.input}
        placeholder={placeholder}
        ref={refer}
      /> 
    </div>
  )
}

export default FormInput

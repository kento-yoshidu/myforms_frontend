import React, { RefObject } from "react"
import styles from "./form-input.module.css"

type Props = {
  placeholder: string,
  name: string
}

const FormInput = (props: any) => {
  const {label, onChange, id, ...inputProps} = props

  return (
    <div className={styles.formInput}>
      <label
        className={styles.label}
      >
        {label}
      </label>

      <input
        className={styles.input}
        {...inputProps}
        onChange={onChange}
      />
    </div>
  )
}

export default FormInput

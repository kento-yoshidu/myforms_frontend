import React, { RefObject, useState } from "react"
import styles from "./form-input.module.css"

type Props = {
  placeholder: string,
  name: string
}

const FormInput = (props: any) => {
  const [focused, setFocused] = useState(false)

  const {label, onChange, errorMessage, id, ...inputProps} = props

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocused(true)
  }

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
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />

      <span className={styles.errorMessage}>
        {errorMessage}
      </span>
    </div>
  )
}

export default FormInput

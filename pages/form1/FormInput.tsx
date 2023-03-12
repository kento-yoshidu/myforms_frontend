import React, { useState } from "react"
import styles from "./form-input.module.css"

type Props = {
  label: string,
  errorMessage: string
  name: string
  value: {
    input: {
      name: string
    }
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput = ({
  label,
  onChange,
  errorMessage,
  value,
  ...others
}: Props) => {
  const [focused, setFocused] = useState(false)

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
        {...others}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          others.name === "confirmPassword" && setFocused(true)
        }
        /* @ts-ignore */
        focused={focused.toString()}
      />

      <span className={styles.errorMessage}>
        {errorMessage}
      </span>
    </div>
  )
}

export default FormInput

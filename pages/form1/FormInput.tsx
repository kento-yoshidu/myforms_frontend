import React from "react"
import Styles from "./input.module.css"

type Props = {
  placeholder: string,
  name: string
}

const FormInput = (props: any) => {
  const { label, errorMessage, onChange, id, ...inputProps} = props

  return (
    <div className={Styles.formInput}>
      <label className={Styles.label}>{label}</label>

      <input
        {...inputProps}
        onChange={onChange}
        className={Styles.input}
      /> 

      <span>{errorMessage}</span>
    </div>
  )
}

export default FormInput

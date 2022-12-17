import React from "react"
import Styles from "./input.module.css"

type Props = {
  placeholder: string,
  name: string
}

const FormInput = (props: any) => {
  const { label, onChange, id, ...inputProps} = props

  console.log(label, onChange)

  return (
    <div className={Styles.formInput}>
      <label>{label}</label>

      <input
        {...inputProps}
        onChange={onChange}
        className={Styles.input}
      /> 
    </div>
  )
}

export default FormInput

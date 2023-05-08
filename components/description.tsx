import { ReactNode, useRef, useState } from "react"

import styles from "../styles/description.module.css"

type Props = {
  heading?: string
  children: ReactNode,
}

const Description = ({ heading, children }: Props) => {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>{ heading ? heading : "こぼれ話" }</summary>

      <div className={styles.text}>
        {children}
      </div>
    </details>
  )
}

export default Description

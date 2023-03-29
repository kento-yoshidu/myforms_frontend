import { ReactNode, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons"

import styles from "../styles/description.module.css"

const Description = ({ children }: { children: ReactNode }) => {
  const [textIsOpen, setTextIsOpen] = useState(false)

  const toggleText = () => {
    setTextIsOpen((prev) => !prev)
  }

  return (
    <div className={textIsOpen ? styles.open : styles.close}>
      <h3 className={styles.heading}>
        <button onClick={toggleText}>
          こぼれ話
          <FontAwesomeIcon
            /* @ts-ignore */
            icon={faCircleChevronDown}
            className={styles.icon}
          />
        </button>
      </h3>

      <div className={styles.text}>
        <div className={styles.textInner}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Description

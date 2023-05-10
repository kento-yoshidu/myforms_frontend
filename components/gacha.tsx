import { useState } from "react"
import Link from "next/link"

import Loading from "./loading"

import styles from "../styles/gacha.module.css"

const Gacha = () => {
  const [form, setForm] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    new Promise((resolve) => {
      setIsLoading(true)
      setForm(Math.ceil(Math.random() * 5))

      setTimeout(() => {
        resolve("")
      }, 1500)
    })
    .then(() => {
      setIsLoading(false)
    })
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={handleClick}
      >
        ガチャを回す
      </button>

      {isLoading
        ? (
          <Loading />
        )
        : (
          <div
            className={styles.result}
          >
            {form
              ? (
                <Link href={`form${form}`}>Form{form}</Link>
              )
              : (
                <p>ガチャを回してね</p>
              )}
          </div>
        )}
    </div>
  )
}

export default Gacha

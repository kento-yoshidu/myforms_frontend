import { useState } from "react"
import Link from "next/link"

import Loading from "./loading"

import styles from "../styles/gacha.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons"

const Gacha = () => {
  const [form, setForm] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    new Promise((resolve) => {
      setIsLoading(true)
      setForm(Math.ceil(Math.random() * 6))

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
        disabled={isLoading}
        aria-disabled={isLoading}
      >
        ガチャを回す
      </button>

      <div
        className={styles.result}
      >
        {isLoading
          ? (
            <Loading />
          )
          : (
            <>
              {form
                ? (
                  <Link
                    className={styles.link}
                    href={`form${form}`}
                  >
                    Form{form}
                  </Link>
                )
                : (
                  <p className={styles.message}>
                    {/* @ts-ignore */}
                    <FontAwesomeIcon icon={faCircleLeft} />
                    ガチャを回してね</p>
                )}
            </>
          )}
        </div>
    </div>
  )
}

export default Gacha

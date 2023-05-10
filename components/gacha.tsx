import { useState } from "react"

import styles from "../styles/gacha.module.css"
import Link from "next/link"

const Gacha = () => {
  const [form, setForm] = useState<number | null>(null)

  return (
    <div className={styles.wrapper}>
      <button className={styles.button}>ガチャを回す</button>

      <div className={styles.result}>
        <Link href="form1">Form1</Link>
      </div>
    </div>
  )
}

export default Gacha

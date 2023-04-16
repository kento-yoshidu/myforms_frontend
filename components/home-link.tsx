import Link from "next/link"

import styles from "../styles/button.module.css"

const HomeLink = () => (
  <div className={styles.wrapper}>
    <Link
      className={styles.button}
      href="/"
    >
      Home
    </Link>
  </div>
)

export default HomeLink

import Link from "next/link"
import styles from "../pages/styles/header.module.css"

const Header = ({ isTop = false }) => {
  return (
    <header className={styles.header}>
      {isTop ? (
        <h1 className={styles.sitename}>My Forms</h1>
      ) : (
        <h1 className={styles.sitename}>
          <Link href="/">
            My Forms
          </Link>
        </h1>
      )}
    </header>
  )
}

export default Header

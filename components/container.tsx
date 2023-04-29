import { ReactNode } from "react"
import styles from "styles/container.module.css"

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className={styles.default}>
      {children}
    </div>
  )
}

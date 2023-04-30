import { ReactNode } from "react"
import styles from "styles/container.module.css"

const Container = ({ children }: { children: ReactNode }) => (
  <div className={styles.container}>
    {children}
  </div>
)

export default Container

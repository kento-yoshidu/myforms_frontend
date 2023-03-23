import styles from "../styles/pageTitle.module.css"

const PageTitle = ({ pageTitle }: { pageTitle: string }) => (
  <div className={styles.wrapper}>
    <h2 className={styles.pageTitle}>{pageTitle}</h2>
  </div>
)

export default PageTitle

import styles from "../styles/page-header.module.css"

type Props = {
  pageTitle: string
  postdate: string
  update: string
}

const PageHeader = ({ pageTitle, postdate, update }: Props) => {
  const [postY, postM, postD] = postdate.split("-")
  const [updateY, updateM, updateD] = update.split("-")

  return (

    <div className={styles.wrapper}>
      <h2 className={styles.pageTitle}>{pageTitle}</h2>

      <div className={styles.date}>
        <p>投稿日 : <time dateTime={postdate}>{`${postY}年${postM}月${postD}日`}</time></p>
        <p>更新日 : <time dateTime={update}>{`${updateY}年${updateM}月${updateD}日`}</time></p>
      </div>
    </div>
  )
}

export default PageHeader

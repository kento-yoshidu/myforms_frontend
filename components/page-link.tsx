import Link from "next/link"

import styles from "../styles/page-link.module.css"

type Props = {
  prev?: string,
  next?: string
}

const PageLink = ({ prev, next }: Props) => {
  return (
    <>
      {prev && (
        <Link
          href={`/form${prev}`}
          className={styles.prev}
          aria-label={`フォーム${prev}に進む`}
        >
          Prev
        </Link>
      )}
      {next && (
        <Link
          href={`/form${next}`}
          className={styles.next}
          aria-label={`フォーム${next}に進む`}
        >
          Next
        </Link>
      )}
    </>
  )
}

export default PageLink

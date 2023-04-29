import Link from "next/link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft ,faChevronRight } from "@fortawesome/free-solid-svg-icons"

import styles from "../styles/page-link.module.css"

type Props = {
  prev?: string,
  next?: string
}

const PageLink = ({ prev, next }: Props) => {
  return (
    <div className={styles.wrapper}>
      {prev && (
        <Link
          href={`/form${prev}`}
          className={styles.prev}
          aria-label={`フォーム${prev}に進む`}
        >
          {/* @ts-ignore */}
          <FontAwesomeIcon icon={faChevronLeft} />
          <span>{`Form${prev}`}</span>
        </Link>
      )}
      {next && (
        <Link
          href={`/form${next}`}
          className={styles.next}
          aria-label={`フォーム${next}に進む`}
        >
          <span>{`Form${next}`}</span>
          {/* @ts-ignore */}
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      )}
    </div>
  )
}

export default PageLink

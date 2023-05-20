import { ReactNode, useRef, useState } from "react"

import styles from "../styles/description.module.css"

const animeTiming = {
  duration: 800,
  easing: "ease"
}

const closingAnimeKeyframes = (content: HTMLDivElement) => [
  {
    height: content.offsetHeight + "px",
    opacity: 1
  },
  {
    height: 0,
    opacity: 0
  }
]

const openingAnimKeyframes = (content: HTMLDivElement) => [
  {
    height: 0,
    opacity: 0,
  }, {
    height: content.offsetHeight + 'px',
    opacity: 1,
  }
];


type Props = {
  heading?: string
  children: ReactNode,
}

const Description = ({ heading, children }: Props) => {
  const refContent = useRef<HTMLDivElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()

    const detailsElement = refContent.current?.parentNode as HTMLDialogElement

    if (detailsElement.dataset.animStatus === "running") {
      return
    }

    if (detailsElement.open) {
      detailsElement.dataset.animeStatus = "running"

      refContent.current!.animate(closingAnimeKeyframes(refContent.current!), animeTiming).onfinish = () => {
        detailsElement.removeAttribute("open")
        detailsElement.dataset.animeStatus = ""
      }
    } else {
      detailsElement.setAttribute("open", "true")

      const openAnimation = refContent.current?.animate(openingAnimKeyframes(refContent.current), animeTiming)

      detailsElement.dataset.animeStatus = "running"

      openAnimation!.onfinish = () => {
        detailsElement.dataset.animeStatus = ""
      }
    }
  }
  return (
    <details className={styles.details}>
      <summary
        className={styles.summary}
        onClick={handleClick}
      >
        { heading ? heading : "こぼれ話" }
      </summary>

      <div
        className={styles.content}
        ref={refContent}
      >
        <div className={styles.contentInner}>
          {children}
        </div>
      </div>
    </details>
  )
}

export default Description

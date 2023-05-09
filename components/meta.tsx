import Head from "next/head"

import { siteMetaData } from "../lib/constants"
import { useRouter } from "next/router"

import siteImage from "images/ogp.png"

const { siteTitle, siteDesc, siteUrl, siteLocale, siteType } = siteMetaData

type Props = {
  pageTitle?: string
  pageDesc?: string
}

const Meta = ({ pageTitle, pageDesc }: Props) => {
  // const router = useRouter()

  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle
  const desc = pageDesc ?? siteDesc
  // const url = `${siteUrl}${router.asPath}`

  const img = siteImage.src
  const imgW = siteImage.width
  const imgH = siteImage.height
  const imgUrl = `${siteUrl}${img}`

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={pageTitle} />
      <meta name="description" content={desc} />
      <meta property="og:description" content={desc} />
      {/*
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
    */}

      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:type" content={siteType} />
      <meta property="og:locale" content={siteLocale} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={String(imgW)} />
      <meta property="og:image:height" content={String(imgH)} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

export default Meta

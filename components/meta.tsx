import Head from "next/head"

import { siteMetaData } from "../lib/constants"

const { siteTitle, siteDesc, siteUrl, siteLocale, siteType } = siteMetaData

type Props = {
  pageTitle?: string
}

const Meta = ({ pageTitle }: Props) => {
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={pageTitle} />
    </Head>
  )
}

export default Meta

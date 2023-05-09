import Head from "next/head"

type Props = {
  pageTitle: string
}

const Meta = ({ pageTitle }: Props) => {
  return (
    <Head>
      <title>{ pageTitle }</title>
      <meta property="og:title" content={pageTitle} />
    </Head>
  )
}

export default Meta

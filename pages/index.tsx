import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Forms</title>
      </Head>

      <Link href="/form1">Form1</Link>
    </>
  )
}

export default Home

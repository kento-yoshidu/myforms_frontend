import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import Header from '../components/header'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Forms</title>
      </Head>

      <Header isTop />

      <Link href="/form1">Form1</Link>
    </>
  )
}

export default Home

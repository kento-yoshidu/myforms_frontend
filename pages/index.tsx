import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Container from '../components/container'
import Header from '../components/header'
import styles from '../styles/style.module.css'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Forms</title>
      </Head>

      <Header isTop />

      <Container>
        <Link href="/form1">Form1</Link>
      </Container>
    </>
  )
}

export default Home

import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/header'
import styles from '../styles/style.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Forms</title>
      </Head>

      <Header isTop />

      <main className={styles.main}>
        <Link href="/form1">Form1</Link>
      </main>
    </div>
  )
}

export default Home

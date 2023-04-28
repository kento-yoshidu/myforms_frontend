import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Container from '../components/container'
import Header from '../components/header'

import styles from "../styles/style.module.css"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Forms</title>
      </Head>

      <Header isTop />

      <Container>
        <main className={styles.main}>
          <ul className={styles.list}>
            <li>
              <Link href="/form1">Form1</Link>
            </li>

            <li>
              <Link href="/form2">Form2</Link>
            </li>
          </ul>
        </main>
      </Container>
    </>
  )
}

export default Home

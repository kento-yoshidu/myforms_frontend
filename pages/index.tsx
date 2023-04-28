import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Container from '../components/container'
import Header from '../components/header'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Forms</title>
      </Head>

      <Header isTop />

      <Container>
        <ul>
          <li>
            <Link href="/form1">Form1</Link>
          </li>

          <li>
            <Link href="/form2">Form2</Link>
          </li>
        </ul>
      </Container>
    </>
  )
}

export default Home

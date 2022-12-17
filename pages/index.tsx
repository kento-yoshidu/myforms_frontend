import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <h1>My Forms</h1>  

      <Link href="/form1">Form1</Link>
    </>
  )
}

export default Home

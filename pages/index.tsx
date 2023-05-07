import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/header'

import styles from "../styles/style.module.css"
import Description from '../components/description'

const Home: NextPage = () => (
  <>
    <Head>
      <title>My Forms</title>
    </Head>

    <Header isTop />

    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.h1} data-testid="site-title">My Forms</h1>

        <p>ダミーのフォームを作成し、沢山並べているサイトです。</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>フォーム一覧</h2>

        <ul className={styles.list}>
          <li>
            <Link href="/form1">Form1</Link>
          </li>

          <li>
            <Link href="/form2">Form2</Link>
          </li>

          <li>
            <Link href="/form3">Form3</Link>
          </li>

          <li>
            <Link href="/form4">Form4</Link>
          </li>

          <li>
            <Link href="/form5">Form5</Link>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>&lt;!-- フォームガチャを回す（実装中🙇‍♂️） --&gt;</h2>

      </section>

      <Description heading="このサイトについて">
        <section>
          <h2>このサイトについて</h2>
          <p>私のUI/UX、アクセシビリティに関する力を高めるため、ダミーのフォームを沢山作って並べているサイトです。ボタンをクリックしても何も起こらないので、気軽に遊んで行ってください。</p>
          <p>様々な状況、要件に応じたフォームを自在に作成できるようになることを目指しています。フォーム作成には唯一の正解がないため、ベストプラクティスを考える内容ではありません。そのためフォーム同士を比べると、実装やそのもとになる考え方が矛盾している場合があります。</p>
        </section>

        <section>
          <h2>技術</h2>
          <p>Next.jsで構築しています。React Hook FormやZodといった便利なライブラリーもあるのですが、あまり使用しない方向で作成したいと考えています。自力で構築できるのが一番ですからね💪。</p>
        </section>
      </Description>
    </main>
  </>
)

export default Home

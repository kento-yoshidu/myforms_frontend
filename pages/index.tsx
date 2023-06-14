import type { NextPage } from 'next'
import Link from 'next/link'
import Header from '../components/header'

import styles from "../styles/style.module.css"
import Description from '../components/description'
import Meta from '../components/meta'
import Gacha from '../components/gacha'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

const Home: NextPage = () => (
  <>
    <Meta />

    <Header isTop />

    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.h1} data-testid="site-title">My Forms</h1>

        <p>ダミーのフォームを作成し、沢山並べているサイトです。</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>フォーム一覧</h2>

        <nav>
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

            <li>
              <Link href="/form6">Form6</Link>
            </li>
          </ul>
        </nav>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>フォームガチャ</h2>

        <Gacha />

      </section>

      <Description heading="このサイトについて">
        <section>
          <h3>このサイトについて</h3>
          <p>私のUI/UX、アクセシビリティに関する力を高めるため、ダミーのフォームを沢山作って並べているサイトです。ボタンをクリックしても何も起こらないので、気軽に遊んで行ってください。</p>
          <p>様々な状況、要件に応じたフォームを自在に作成できるようになることを目指しています。フォーム作成には唯一の正解がないため、ベストプラクティスを考える内容ではありません。そのためフォーム同士を比べると、実装やそのもとになる考え方が矛盾している場合があります。</p>
        </section>

        <section>
          <h3>技術</h3>
          <p>Next.jsで構築しています。React Hook FormやZodといった便利なライブラリーもあるのですが、あまり使用しない方向で作成したいと考えています。自力で構築できるのが一番ですからね💪。</p>
        </section>
      </Description>

      <div style={{marginTop: "30px"}}></div>

      <Description heading="サイト作成のドキュメント、メモなど">
        <section>
          <p>GitHubリポジトリーへのリンクです。別タブが開きます。</p>

          <ul>
            <li>
              <a href="https://github.com/kento-yoshidu/MyForms/blob/main/doc/document.md#%E5%90%84%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0%E3%81%A7%E3%82%84%E3%82%8A%E3%81%9F%E3%81%84%E3%81%93%E3%81%A8" target="_blank">
                各フォームでやりたいこと
              </a>
              {/* @ts-ignore */}
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </li>
            <li>
              <a href="https://github.com/kento-yoshidu/MyForms/blob/main/doc/document.md#%E5%87%BA%E6%9D%A5%E3%82%8B%E3%81%A8%E3%81%93%E3%82%8D%E3%81%8B%E3%82%89%E3%82%84%E3%82%8D%E3%81%86wai-aria" target="_blank">
                出来るところからやろう、WAI-ARIA
              </a>
              {/* @ts-ignore */}
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </li>
            <li>
              <a href="https://github.com/kento-yoshidu/MyForms/blob/main/doc/document.md#%E3%83%86%E3%82%B9%E3%83%88%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E3%81%82%E3%82%8C%E3%81%93%E3%82%8C" target="_blank">
                テストについてあれこれ
              </a>
              {/* @ts-ignore */}
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </li>
          </ul>
        </section>
      </Description>
    </main>
  </>
)

export default Home

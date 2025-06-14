import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { Toaster } from 'sonner'

import '../styles/globals.css'

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Toaster
        position="bottom-center"
        richColors
      />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp

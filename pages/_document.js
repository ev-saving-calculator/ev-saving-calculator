import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import theme from '../src/theme'

function onLoad() {
  this.onload = null
  this.rel = 'stylesheet'
}

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="cs">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            as="style"
            onLoad={onLoad}
          />
          <meta name="google-site-verification" content="JL3eQMmQB_9EueAfEsqWpG_KjrSrs9d5mFD8IrDaGKY" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <meta name="robots" content="index,follow" />
          <meta name="author" content="Petr Pololáník" />
          <meta
            name="keywords"
            content="Tesla, nabíjení, kalkulačka, elektro, elektroauto, elektromobilita, úspora"
            lang="cs"
          />
          <meta
            name="description"
            content="Orientační kalkulačka pro porovnání nákladu na nákup a provoz elektromobilu a auta se spalovacím motorem v podmínkách České republiky."
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://electripe.cz/" />
          <meta property="og:title" content="Vyplatí se mi elektromobil?" />
          <meta
            property="og:description"
            content="Orientační kalkulačka pro porovnání nákladu na nákup a provoz elektromobilu a auta se spalovacím motorem v podmínkách České republiky."
          />
          <meta property="og:image" content="https://electripe.cz/screenshot.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://electripe.cz/" />
          <meta property="twitter:title" content="Vyplatí se mi elektromobil?" />
          <meta
            property="twitter:description"
            content="Orientační kalkulačka pro porovnání nákladu na nákup a provoz elektromobilu a auta se spalovacím motorem v podmínkách České republiky."
          />
          <meta property="twitter:image" content="https://electripe.cz/screenshot.png" />

          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#353535" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
  }
}

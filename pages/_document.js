import Document, { Head, Main, NextScript } from 'next/document'
import { AppRegistry } from 'react-native'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage, req }) {
    AppRegistry.registerComponent('Main', () => Main)
    const { stylesheet, getStyleElement } = AppRegistry.getApplication('Main')
    const page = renderPage()
    const styles = (
      <>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        {getStyleElement()}
      </>
    )

    return { ...page, styles }
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />
          <link
            href="https://fonts.googleapis.com/css?family=Rubik:400,700"
            rel="stylesheet"
          />
          {/* <link
            href="https://fonts.googleapis.com/css?family=Oswald&display=swap"
            rel="stylesheet"
          /> */}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js" />
        </Head>
        <body className="is-boxed has-animations">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

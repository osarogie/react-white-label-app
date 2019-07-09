import React from 'react'
import App, { Container } from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import '../app/styles/override.scss'
import { ThemeProvider } from '../app/providers/ThemeProvider'

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React)
}

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default class extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    )
  }
}

import { PRIMARY } from '../styles/colors'
import { Provider, DefaultTheme } from 'react-native-paper'
import Head from 'next/head'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY,
    accent: PRIMARY
  }
}

export function ThemeProvider({ children }) {
  return (
    <Provider theme={theme}>
      <Head>
        <style type="text/css">{`
        @font-face {
          font-family: 'MaterialIcons';
          src: url(${require('react-native-vector-icons/Fonts/MaterialIcons.ttf')}) format('truetype');
        }
        @font-face {
          font-family: 'Feather';
          src: url(${require('react-native-vector-icons/Fonts/Feather.ttf')}) format('truetype');
        }`}</style>
      </Head>
      {children}
    </Provider>
  )
}

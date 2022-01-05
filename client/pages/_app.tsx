import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { deepOrange, deepPurple } from '@material-ui/core/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: deepOrange[800],
    },
    secondary: {
      main: deepPurple[800],
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout> 
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )

}

export default MyApp

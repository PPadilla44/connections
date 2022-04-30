import '../styles/globals.css'
import Navbar from "../components/Navbar"
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps, router }: AppProps) {
  
  const { route } = router;
  
  return (
    <>
      <Navbar route={route} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

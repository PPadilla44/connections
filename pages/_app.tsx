import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { AppProps } from "next/app";
import { AuthProvider } from "../components/hooks/useAuth";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;

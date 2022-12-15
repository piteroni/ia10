import Footer from "@/components/parts/Footer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Head>
      <div className="relative justify-center min-h-screen bg-black">
        <Component {...pageProps} />

        <Footer />
      </div>
    </>
  );
}

export default App;

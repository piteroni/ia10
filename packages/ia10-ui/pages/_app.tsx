import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="relative justify-center h-screen min-h-screen bg-black">
      <Header />

      <Component {...pageProps} />

      <Footer />
    </div>
  );
}

export default App;

import Footer from "@/components/Footer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="relative justify-center min-h-screen bg-black">
      <Component {...pageProps} />

      <Footer />
    </div>
  );
}

export default App;

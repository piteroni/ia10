import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="relative justify-center min-h-screen bg-black">
      <Header />

      <Component {...pageProps} />
    </div>
  );
}

export default App;

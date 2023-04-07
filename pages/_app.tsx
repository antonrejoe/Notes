import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "jotai";
import CookiesProvider from "react-cookie/cjs/CookiesProvider";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </CookiesProvider>
  );
}

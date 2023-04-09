import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CookiesProvider from "react-cookie/cjs/CookiesProvider";
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </CookiesProvider>
    </QueryClientProvider>
  );
}

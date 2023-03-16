import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/feature/store";
import { GlobalStyle } from "@/styles/global-style";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

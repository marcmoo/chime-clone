import GlobalStyle from "@styles/GlobalStyle.styled";

import type { AppProps } from "next/app";
import type { NextPageWithLayout } from "@types";

import { ApolloProvider } from "@apollo/client";
import client from "@lib/apollo-client";
import { Loader } from "@components/composition";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || (page => page);

  return (
    <ApolloProvider client={client}>
      {getLayout(
        <>
          <GlobalStyle />
          <Loader />
          <Component {...pageProps} />
        </>
      )}
    </ApolloProvider>
  );
}

export default MyApp;

import { Provider } from 'next-auth/client';
import type { AppProps } from 'next/app';
import React from 'react';

function WebUiApp({ Component, pageProps }: AppProps & InitialProps) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default WebUiApp;

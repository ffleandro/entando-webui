import { Provider } from 'next-auth/client';
import type { AppInitialProps, AppProps } from 'next/app';
import React from 'react';

function WebUiApp({ Component, pageProps }: AppProps & AppInitialProps) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default WebUiApp;

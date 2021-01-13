import React from 'react';

import '../styles/globals.css';
import 'carbon-components/css/carbon-components.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

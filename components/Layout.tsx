import Head from 'next/head';
import * as React from 'react';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

type Props = {
  title?: string;
};

export const Layout: React.FC<Props> = ({ children, title = 'Entando WebUI Example' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      />
    </Head>

    <Header />
    <div className="container my-5">{children}</div>
    <Footer />
  </div>
);

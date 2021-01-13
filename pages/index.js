import Head from 'next/head';
import React from 'react';

import Header from '../components/widgets/Header/index.jsx';
import Menu from '../components/widgets/Menu/index.jsx';
import {
  Entando6CMSContentsDataSource,
  Entando6KeycloakAccessTokenDataSource,
} from '../datasources/entando6-cms';
import styles from '../styles/Home.module.css';
import { PRODUCT_CATEGORIES } from '../utils/mocks';

export default function Home({ products, categories, banners }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{'Entando'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Menu categories={categories} />

      <main className={styles.main}>
        {products.map((p) => (
          <p key={p.id}>{p.id}</p>
        ))}

        {categories.map((c) => (
          <p key={c.id}>{c.id}</p>
        ))}

        {banners.map((b) => (
          <p key={b.id}>{b.id}</p>
        ))}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          {'Powered by'} <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  console.log('Calling getStaticProps');

  const baseurl = 'http://quickstart-release-e6-3-0.apps.rd.entando.org/entando-de-app';
  const clientId = 'entando-bundler';
  const clientSecret = '1c5e2fe8-ff41-4bc7-8f2b-3509133a2a91';

  const token = await Entando6KeycloakAccessTokenDataSource(baseurl, clientId, clientSecret)();
  console.log('Fetched Entando Keycloak Token');

  const datasources = [
    Entando6CMSContentsDataSource(baseurl, token, 'PRD'),
    Entando6CMSContentsDataSource(baseurl, token, 'CTG'),
    Entando6CMSContentsDataSource(baseurl, token, 'BAN'),
  ];

  console.log('Created datasources...');

  const results = await Promise.all(datasources.map(async (d) => d()));

  const [banners, products, categories] = results;

  return {
    props: {
      products,
      categories,
      banners,
    },
  };
}

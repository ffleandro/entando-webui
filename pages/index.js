import Head from 'next/head';
import React from 'react';

import Banner from '../components/widgets/Banner/index.jsx';
import Footer from '../components/widgets/Footer/index.jsx';
import Header from '../components/widgets/Header/index.jsx';
import Menu from '../components/widgets/Menu/index.jsx';
import ProductCard from '../components/widgets/ProductCard/index.jsx';
import {
  BannersDataSource,
  CategoriesDataSource,
  ProductsDataSource,
} from '../datasources/ecommerce-entando6-cms';
import { Entando6KeycloakAccessTokenDataSource } from '../datasources/entando6-cms';
import styles from '../styles/Home.module.css';

const URL = 'http://quickstart-release-e6-3-0.apps.rd.entando.org';

export default function Home({ products = [], categories = [], banners = [] }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{'Entando'}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />
      <Menu categories={categories} />
      <Banner banners={banners} />

      <main className={styles.main}>
        <h2 className={styles.title}>{'Daily Offers'}</h2>
        <div className={styles.productList}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  console.log('Calling getStaticProps');

  const baseurl = `${URL}/entando-de-app`;
  const clientId = 'entando-bundler';
  const clientSecret = '1c5e2fe8-ff41-4bc7-8f2b-3509133a2a91';

  const token = await Entando6KeycloakAccessTokenDataSource(baseurl, clientId, clientSecret)();
  console.log('Fetched Entando Keycloak Token');

  const datasources = [
    //ProductsDataSource(baseurl, token),
    CategoriesDataSource(baseurl, token),
    BannersDataSource(baseurl, token),
  ];

  console.log('Created datasources...');

  const results = await Promise.all(datasources.map(async (d) => d()));

  const [products, categories, banners] = results;

  return {
    props: {
      products,
      categories,
      banners,
    },
  };
}

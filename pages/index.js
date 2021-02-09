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
import { Entando6KeycloakAccessTokenDataSource } from '../datasources/entando6-keycloak';
import styles from '../styles/Home.module.css';

const URL = 'http://quickstart-release-e6-3-0.apps.rd.entando.org';
const CORE_URL = `${URL}/entando-de-app`;
const CLIENT_ID = 'entando-bundler';
const CLIENT_SECRET = '4559a2b7-5190-4ffb-a6bd-f85f1e5a5e66';

export default function Home({ products = [], categories = [], banners = [] }) {
  return (
    <div>
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
    </div>
  );
}

export async function getStaticProps() {
  console.log('Calling getStaticProps');

  const token = await Entando6KeycloakAccessTokenDataSource(CORE_URL, CLIENT_ID, CLIENT_SECRET)();
  console.log('Fetched Entando Keycloak Token');

  const datasources = [
    ProductsDataSource(CORE_URL, token),
    CategoriesDataSource(CORE_URL, token),
    BannersDataSource(CORE_URL, token),
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

import Head from 'next/head';
import React from 'react';

import Banner from '../components/widgets/Banner/index.jsx';
import Footer from '../components/widgets/Footer/index.jsx';
import Header from '../components/widgets/Header/index.jsx';
import Menu from '../components/widgets/Menu/index.jsx';
import ProductCard from '../components/widgets/ProductCard/index.jsx';
import {
  Entando6CMSContentsDataSource,
  Entando6KeycloakAccessTokenDataSource,
} from '../datasources/entando6-cms';
import styles from '../styles/Home.module.css';

const URL = 'http://quickstart-release-e6-3-0.apps.rd.entando.org';

const normalizeCategories = (categories) =>
  categories.map(({ attributes }) => {
    const title = attributes.find((attr) => attr.code === 'title')?.values?.en;
    const link = attributes.find((attr) => attr.code === 'link')?.values?.en;
    const iconPath = attributes.find((attr) => attr.code === 'icon')?.values?.en?.versions[0].path;
    const icon = iconPath ? `${URL}${iconPath}` : undefined;
    return {
      title,
      link,
      icon,
    };
  });

const normalizeBanners = (banners) =>
  banners.map(({ attributes }) => {
    const images = attributes.find((attr) => attr.code === 'image');
    return `${URL}${images.values.en?.versions[0].path}`;
  });

const normalizeProduct = ({ attributes }) => {
  const title = attributes.find((attr) => attr.code === 'title')?.values?.en;
  const code = attributes.find((attr) => attr.code === 'code')?.values?.en;
  const price = attributes.find((attr) => attr.code === 'price')?.value;
  const category = attributes.find((attr) => attr.code === 'category')?.value;
  const imagesAttr = attributes.find((attr) => attr.code === 'images')?.elements;

  const images = imagesAttr.map((img) => `${URL}${img.values?.en?.versions[3]?.path}`);

  return {
    title,
    code,
    price,
    category,
    images,
  };
};

export default function Home({ products = [], categories = [], banners = [] }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{'Entando'}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />
      <Menu categories={normalizeCategories(categories)} />
      <Banner banners={normalizeBanners(banners)} />

      <main className={styles.main}>
        <h2 className={styles.title}>{'Daily Offers'}</h2>
        <div className={styles.productList}>
          {products.map((product) => (
            <ProductCard key={product.id} {...normalizeProduct(product)} />
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
    Entando6CMSContentsDataSource(baseurl, token, 'PRD'),
    Entando6CMSContentsDataSource(baseurl, token, 'CTG'),
    Entando6CMSContentsDataSource(baseurl, token, 'BAN'),
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

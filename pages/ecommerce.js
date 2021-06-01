import Head from 'next/head';
import { Layout } from 'components/Layout';
import { Menu } from 'components/Menu';
import { Banner } from 'components/Banner';
import { ProductCard } from 'components/ProductCard';

import {
  BannersDataSource,
  CategoriesDataSource,
  ProductsDataSource,
} from '../datasources/ecommerce-entando6-cms';
import { Entando6KeycloakAccessTokenDataSource } from '../datasources/entando6-keycloak';

import styles from 'styles/Ecommerce.module.css';

const URL = 'http://quickstart-release-e6-3-0.apps.rd.entando.org';
const CORE_URL = `${URL}/entando-de-app`;
const CLIENT_ID = 'entando-webui';
const CLIENT_SECRET = 'aea40607-fd07-46ef-bbc5-6007c17c8c0e';

const EcommerceExamplePage = ({ products = [], categories = [], banners = [] }) => {
  return (
    <div>
      <div className={styles.container}>
        <Head>
          <title>{'Entando'}</title>
          <link rel="icon" href="/favicon.png" />
        </Head>

        <Layout title="Entando WebUI | E-commerce Example Page">
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
        </Layout>
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
    revalidate: 15,
  };
}

export default EcommerceExamplePage;

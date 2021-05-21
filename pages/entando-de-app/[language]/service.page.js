import Head from 'next/head';
import { Layout } from 'components/Layout';

/**
 * Example Route Override.
 * 
 * This example shows how to override a route that is usually
 * provided by PortalUI: /entando-de-app/en/service.page
 * 
 * This specific page is now controlled by WebUI and you can apply
 * any web development techinique you want.
 * 
 * Routes that are not overriden by specific next.js routes,
 * are fallbacked to the [...catchall].js route
 *
 **/
function ServicePage() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Layout title="Service Page | WebUI Example">
        <h1 className="my-5">Welcome to the Next Generation Entando Web Renderization Engine</h1>}
      </Layout>
    </>
  );
}

export default ServicePage;

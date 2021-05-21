import { getSession } from 'next-auth/client';
import getConfig from 'next/config';
import React from 'react';

import { Entando6PortalUIUrlDataSource } from 'datasources/entando6-portalui';

/**
 * This Catch All Rule allows to gradually migrate from a monolith
 * into a modern MFE Entando Architecture
 * Minimizes impact during refactoring stages and allows
 * Developers to be much more distribuded and agile
 **/
export default class EntandoPage extends React.Component {
  render() {
    return (
      <Head>
        <title>My page title</title>
        <link rel="entando" href="/favicon.ico" />
      </Head>
    );
  }
}

export async function getServerSideProps({ req, res }) {
  const { serverRuntimeConfig, entandoPageSettings } = getConfig();

  //TODO: Load from PortalUI API. Allways True for testing purposes
  const isPrivatePage = true;

  // Session is available both Server and Client side
  const session = await getSession({ req });

  if (isPrivatePage && (!session || !session.user)) {
    //Redirect to NextAuth.js authorization url
    return {
      redirect: {
        destination: `${process.env.NEXTAUTH_URL}/api/auth/signin?callbackUrl=${process.env.NEXTAUTH_URL}${req.url}`,
      },
    };
  }

  // Request rendered page from legacy system.
  // In this case it's PortalUI, but technically can be any system
  const { html, statusCode, headers } = await Entando6PortalUIUrlDataSource(
    req.method,
    `${serverRuntimeConfig.PORTALUI_ADDR}${req.url}`,
    req.headers
  );

  /** 
   * TODO: Here we can load some service configuration, for instance new Entando Core Micro Service,
   * and inject MFEs in loaded HTML according to a specific configuration or business logic
   * 
   * This technique allows to gradually migrate a Monolith into Entando and have full control
   * of the resulted proxyed html.
   * 
   * Here we show an example loading pages from PortalUI, but technically can be any Legacy System
   **/

  for (const header in headers) {
    res.setHeader(header, headers[header]);
  }

  res.setHeader('X-Entando-Webui-Header', 'Origin: WebUI');

  res.statusCode = statusCode;
  res.write(html);
  res.end();

  return {
    props: {
      session,
    },
  };
}

import { getSession } from 'next-auth/client';
import getConfig from 'next/config';
import React from 'react';

import { Entando6PortalUIUrlDataSource } from '../datasources/entando6-portalui';

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

  const isPrivatePage = true;
  const session = await getSession({ req });

  if (isPrivatePage && (!session || !session.user)) {
    return {
      redirect: {
        destination: `http://localhost:5000/api/auth/signin?callbackUrl=${process.env.NEXTAUTH_URL}${req.url}`,
      },
    };
  }

  const { html, statusCode, headers } = await Entando6PortalUIUrlDataSource(
    req.method,
    `${serverRuntimeConfig.PORTALUI_ADDR}${req.url}`,
    req.headers
  );

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

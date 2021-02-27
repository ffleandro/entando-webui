import React from 'react';
import getConfig from 'next/config'

import { Entando6PortalUIUrlDataSource } from '../datasources/entando6-portalui';

export default class EntandoPage extends React.Component {}

export async function getServerSideProps({ req, res }) {
  const { serverRuntimeConfig } = getConfig();

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
    props: {},
  };
}

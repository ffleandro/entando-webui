import React from 'react';

import {
  Entando6CoreFragmentSource,
  Entando6CorePageConfigurationSource,
  Entando6CorePageDataSource,
  Entando6CorePagesDataSource,
  Entando6CorePageTemplateDataSource,
} from '../../../datasources/entando6-core';
import { Entando6KeycloakAccessTokenDataSource } from '../../../datasources/entando6-keycloak';

const CORE_URL = 'http://quickstart-release-e6-3-0.apps.rd.entando.org/entando-de-app';
const CLIENT_ID = 'entando-bundler';
const CLIENT_SECRET = '4559a2b7-5190-4ffb-a6bd-f85f1e5a5e66';

export default class EntandoPage extends React.Component {}

/*export async function getStaticPaths() {
  console.log('Calling getStaticPaths');

  const token = await Entando6KeycloakAccessTokenDataSource(CORE_URL, CLIENT_ID, CLIENT_SECRET)();
  console.log('Fetched Entando Keycloak Token');

  const pages = await Entando6CorePagesDataSource(CORE_URL, token)();
  const paths = pages .filter((p) => p.code !== 'service')
    .map((p) => `/entando-de-app/${p.code}`);

  return { paths, fallback: false };
}*/

export async function getServerSideProps({ res, params }) {
  console.log('Calling getServerSideProps');

  const language = params.language;
  const pageCode = params.code.includes('.page') ? params.code.split('.page')[0] : params.code;

  const token = await Entando6KeycloakAccessTokenDataSource(CORE_URL, CLIENT_ID, CLIENT_SECRET)();
  console.log('Fetched Entando Keycloak Token');

  const page = await Entando6CorePageDataSource(CORE_URL, token, pageCode)();
  const template = await Entando6CorePageTemplateDataSource(CORE_URL, token, page.pageModel)();

  const fragment_codes = Array.from(
    template.template.matchAll(/<@wp.fragment code="(.+)" .*\/>/g) || []
  ).map((m) => m[1]);

  const fragments = await Promise.all(
    fragment_codes.map(async (code) => {
      const fragment = await Entando6CoreFragmentSource(CORE_URL, token, code)();
      return fragment;
    })
  );

  fragments.map((f) => {
    f.processedTemplate = processCommonTags(f.guiCode || f.defaultGuiCode);
    return f;
  });

  let processedTemplate = processCommonTags(template.template);
  processedTemplate = processPageTag(processedTemplate, page, language);

  fragments.forEach((f) => {
    processedTemplate = replaceWithRenderedFragment(processedTemplate, f.code, f.processedTemplate);
  });

  //console.log(processedTemplate);

  //const { head, body } = extractHeadAndBody(processedTemplate);

  res.setHeader('Content-type', 'text/html');
  res.write(processedTemplate);
  res.end();

  return {
    props: {
      page,
      template: processedTemplate,
      //head,
      //body,
    },
  };
}

function processCommonTags(source) {
  let output = source;

  //Remove aps-core import
  output = output.replaceAll(/<#assign wp=JspTaglibs\["\/aps-core"\]>\n/g, '');

  //TODO: temporarily removing outputHeadInfo
  output = output.replaceAll(
    /<@wp.outputHeadInfo type="CSS">(.|\n)+<\/@wp.outputHeadInfo>\n/gm,
    ''
  );

  //Remove all nonces
  //TODO: How to handle nonces?
  output = output.replaceAll(/ nonce="<@wp.cspNonce \/>"/g, '');
  output = output.replaceAll(/<script[\s+]>/g, '<script>');

  //Replace applicationBaseUrl variable
  output = output.replaceAll(
    /<@wp.info key="systemParam" paramName="applicationBaseURL" \/>/g,
    `${CORE_URL}/`
  );
  output = output.replaceAll(/\${appUrl}/g, `${CORE_URL}/`);
  output = output.replaceAll(
    /<@wp.info key="systemParam" paramName="applicationBaseURL" var="appUrl" \/>/g,
    ''
  );

  //Replace resourceUrl tag
  output = output.replaceAll(/<@wp.resourceURL \/>/g, `${CORE_URL}/cmsresources/`);

  //Replace wp.show tag
  output = output.replaceAll(
    /<@wp.show frame=[0-9]+ \/>/g,
    `<div style="background: ${randomHexColor()}; border-color: ${randomHexColor()}">WIDGET</div>`
  );

  return output;
}

function processPageTag(source, page, language) {
  let output = source;

  //Replace page.title tag
  console.log(page);
  output = output.replaceAll(/<@wp.currentPage param="title" \/>/g, `${page.titles[language]}`);

  return output;
}

function replaceWithRenderedFragment(source, code, renderedFragment) {
  return source.replace(new RegExp(`<@wp.fragment code="${code}" .*/>`), renderedFragment);
}

function extractHeadAndBody(source) {
  var html = parse(source);

  const head = html.querySelector('head').innerHTML;
  const body = html.querySelector('body').innerHTML;

  //console.log('HEAD --> ', head);

  //console.log('BODY --> ', body);

  return {
    head,
    body,
  };
}

function randomHexColor() {
  const hexCode = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += hexCode[Math.floor(Math.random() * 16)];
  }

  return color;
}

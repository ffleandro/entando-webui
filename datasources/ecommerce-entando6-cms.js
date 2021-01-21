//import objectMapper from 'object-mapper';

import { Entando6CMSContentDataSource, Entando6CMSContentsDataSource } from './entando6-cms';

export function ProductsDataSource(url, token) {
  console.log(`Creating Products Data Source: ${url}`);
  return async () => {
    console.log('Calling ProductsDataSource...');
    const products = await new Entando6CMSContentsDataSource(url, token, 'PRD')();
    return products.map((p) => normalizeProduct(url, p));
  };
}

export function ProductsDataSourceWithSwr(url, token) {
  console.log(`Creating Products Data Source: ${url}`);
  return async () => {
    console.log('Calling ProductsDataSource...');
    const products = await new Entando6CMSContentsDataSource(url, token, 'PRD')();
    return products.map((p) => normalizeProduct(url, p));
  };
}

export function CategoriesDataSource(url, token) {
  console.log(`Creating Categories Data Source: ${url}`);
  return async () => {
    console.log('Calling CategoriesDataSource...');
    const categories = await new Entando6CMSContentsDataSource(url, token, 'CTG')();
    return categories.map((c) => normalizeCategory(url, c));
  };
}

export function BannersDataSource(url, token) {
  console.log(`Creating Banners Data Source: ${url}`);
  return async () => {
    console.log('Calling BannersDataSource...');
    const datasource = new Entando6CMSContentsDataSource(url, token, 'BAN');
    const banners = await datasource();
    return banners.map((b) => normalizeBanner(url, b));
  };
}

export function ProductPriceAndStockDataSource(url, token, productId) {
  console.log(`Creating Product And Price Data Source: ${url}, ${productId}`);
  return async () => {
    console.log('Calling ProductPriceAndStockDataSource...');
    const product = await new Entando6CMSContentDataSource(url, token, productId)();

    const attributes = product.attributes;
    const price = attributes.filter((a) => a.code === 'price');
    const stock = attributes.filter((a) => a.code === 'stock');

    return {
      price,
      stock,
    };
  };
}

// private utils
// TODO should be using object-mapper lib
const normalizeCategory = (baseurl, category) => {
  const [url] = baseurl.split('/entando-de-app');
  const title = category.attributes.find((attr) => attr.code === 'title')?.values?.en;
  const link = category.attributes.find((attr) => attr.code === 'link')?.values?.en;
  const iconPath = category.attributes.find((attr) => attr.code === 'icon')?.values?.en?.versions[0]
    .path;
  const icon = iconPath ? `${url}${iconPath}` : undefined;
  return {
    title,
    link,
    icon,
  };
};

const normalizeBanner = (baseurl, banner) => {
  const [url] = baseurl.split('/entando-de-app');
  const image = banner.attributes.find((attr) => attr.code === 'image');
  return `${url}${image.values.en?.versions[0].path}`;
};

const normalizeProduct = (baseurl, product) => {
  const [url] = baseurl.split('/entando-de-app');

  const title = product.attributes.find((attr) => attr.code === 'title')?.values?.en;
  const code = product.attributes.find((attr) => attr.code === 'code')?.values?.en;
  const price = product.attributes.find((attr) => attr.code === 'price')?.value;
  const category = product.attributes.find((attr) => attr.code === 'category')?.value;
  const imagesAttr = product.attributes.find((attr) => attr.code === 'images')?.elements;

  const images = imagesAttr.map((img) => `${url}${img.values?.en?.versions[3]?.path}`);

  return {
    title,
    code,
    price,
    category,
    images,
  };
};

import axios from 'axios';

export function Entando6CorePagesDataSource(url, token) {
  console.log('Creating Pages Data Source');
  return async () => {
    console.log('Calling Entando6CorePagesDataSource...');
    const res = await axios.get(`${url}/api/pages?status=published`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.payload;
  };
}

export function Entando6CorePageDataSource(url, token, pageCode) {
  console.log(`Creating Page Data Source: ${pageCode}`);
  return async () => {
    console.log('Calling Entando6CorePageDataSource...');
    const res = await axios.get(`${url}/api/pages/${pageCode}?status=published`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.payload;
  };
}

export function Entando6CorePageTemplateDataSource(url, token, pageTemplateCode) {
  console.log(`Creating Page Template Data Source: ${pageTemplateCode}`);
  return async () => {
    console.log('Calling Entando6CorePageTemplateDataSource...');
    const res = await axios.get(`${url}/api/pageModels/${pageTemplateCode}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.payload;
  };
}

export function Entando6CoreFragmentSource(url, token, fragmentCode) {
  console.log(`Creating Fragment Data Source: ${fragmentCode}`);
  return async () => {
    console.log('Calling Entando6CoreFragmentSource...');
    const res = await axios.get(`${url}/api/fragments/${fragmentCode}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.payload;
  };
}

export function Entando6CorePageConfigurationSource(url, token, pageCode) {
  console.log(`Creating Page Configuration Data Source: ${pageCode}`);
  return async () => {
    console.log('Calling Entando6CorePageConfigurationSource...');
    const res = await axios.get(`${url}/api/page/${pageCode}/widgets?status=published`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.payload;
  };
}

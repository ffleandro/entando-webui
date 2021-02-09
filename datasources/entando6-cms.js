import axios from 'axios';

export function Entando6CMSContentsDataSource(url, token, contentType) {
  console.log(`Creating Contents Data Source: ${contentType}`);
  return async () => {
    console.log('Calling Entando6CMSContentsDataSource...');
    const res = await axios.get(
      `${url}/api/plugins/cms/contents?filters[0].attribute=typeCode&filters[0].operator=eq&filters[0].value=${contentType}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data.payload;
  };
}

export function Entando6CMSContentDataSource(url, token, contentId) {
  console.log(`Creating Content Data Source: ${contentId}`);
  return async () => {
    console.log('Calling Entando6CMSContentDataSource...');
    const res = await axios.get(`${url}/api/plugins/cms/contents/${contentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.payload;
  };
}

// private utility function
const urlEncoder = function (payload) {
  return Object.keys(payload)
    .map((k) => `${k}=${payload[k]}`)
    .reduce((a, v, i) => (i === 0 ? v : `${a}&${v}`), '');
};

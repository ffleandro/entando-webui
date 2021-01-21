import axios from 'axios';

export function Entando6KeycloakAccessTokenDataSource(url, clientId, clientSecret) {
  return async () => {
    const keycloakResponse = await axios.get(url + '/keycloak.json');
    const tokenUrl =
      keycloakResponse.data['auth-server-url'] + '/realms/entando/protocol/openid-connect/token';

    const payload = {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const res = await axios.post(tokenUrl, urlEncoder(payload), { headers });
    return res.data.access_token;
  };
}

export function Entando6CMSContentsDataSource(url, token, contentType) {
  console.log(`Creating Contents Data Source: ${url}, ${contentType}`);
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
  console.log(`Creating Content Data Source: ${url}, ${contentId}`);
  return async () => {
    console.log('Calling Entando6CMSContentDataSource...');
    const res = await axios.get(`${url}/api/plugins/cms/contents/${contentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.payload;
  };
}

export function Entando6CMSContentAttributeDataSource(url, token, contentId, attributeCode) {
  console.log(`Creating Content Attribute Data Source: ${url}, ${contentId}, ${attributeCode}`);
  return async () => {
    console.log('Calling Entando6CMSContentAttributeDataSource...');
    const res = await axios.get(`${url}/api/plugins/cms/contents/${contentId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const attributes = res.data.payload.attributes;
    for(var i = 0; i < attributes.length; i++){
      if(attributes[i].code === attributeCode) {
        return attributes[i];
      }
    }
    return null;
  };
}

// private utility function
const urlEncoder = function (payload) {
  return Object.keys(payload)
    .map((k) => `${k}=${payload[k]}`)
    .reduce((a, v, i) => (i === 0 ? v : `${a}&${v}`), '');
};

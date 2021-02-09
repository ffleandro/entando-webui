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

// private utility function
const urlEncoder = function (payload) {
  return Object.keys(payload)
    .map((k) => `${k}=${payload[k]}`)
    .reduce((a, v, i) => (i === 0 ? v : `${a}&${v}`), '');
};

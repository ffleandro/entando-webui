import axios from 'axios';

export async function Entando6PortalUIUrlDataSource(method, url, headers) {
  console.log(`${method} ${url}`);
  
  let res = {};
  //try {
  res = await axios({
    method: method,
    url: url,
    headers: { headers }
  });
  /*} catch (error) {
    console.log(error);
  }*/

  return {
    html: res.data,
    statusCode: res.status,
    headers: res.headers,
  };
}

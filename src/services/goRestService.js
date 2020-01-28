export default class GoRestService {
  _apiBase = 'https://gorest.co.in/public-api';
  _token = '2znph1MHCJ4sqk0eE25htgHf30htBVYUIbnH';

  getResource = async url => {
    const response = await fetch(
      `${this._apiBase}${url}?_format=json&access-token=${this._token}`
    );
    // console.log(response);
    if (!response.ok) {
      throw new Error(`Something going wrong. Recived: ${response.status}`);
    }
    return response.json();
  };

  getUserList = async () => {
    const res = await this.getResource('/users');
    // console.log(res);
    return res;
  };
}

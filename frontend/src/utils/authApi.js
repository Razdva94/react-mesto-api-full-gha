class AuthApi {
  constructor(options) {
    this._headers = options.headers;
    this._url = options.baseUrl;
  }

  postToSignup({ password, email }) {
    return this._request(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    });
  }

  postToSignin({ password, email }) {
    return this._request(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    });
  }

  getToSignout(){
    return this._request(`${this._url}/signout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getUser() {
    return this._request(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    const updatedOptions = {
      ...options,
      credentials: "include",
    };

    return fetch(url, updatedOptions).then((res) => this._checkResponse(res));
  }
}
const authApi = new AuthApi({
  baseUrl: "http://api.razdva.nomoreparties.sbs",
  headers: {
    "Content-Type": "application/json",
  },
});

export default authApi;

// components/Api.js
export default class Api {
  constructor(userUrl, cardsUrl, token) {
    this._userUrl = userUrl;
    this._cardsUrl = cardsUrl;
    this._token = token;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._userUrl, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  getCards() {
    return fetch(this._cardsUrl, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  _getCardById(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  editUserInfo(name, about) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  addCard(name, link) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  LikeCard(cardId, isLiked) {
    return fetch(`${this._cardsUrl}/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  editAvatar(avatar) {
    return fetch(`${this._userUrl}/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }
}

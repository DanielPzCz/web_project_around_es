export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._professionElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._professionElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._professionElement.textContent = job;
  }

  _handleImageError() {
    this._avatarElement.onerror = () => {
      this._avatarElement.onerror = null;
      this._avatarElement.src = "../images/placeholder.jpg";
    };
  }

  setUserAvatar(url) {
    this._avatarElement.src = url;
    this._handleImageError();
  }
}

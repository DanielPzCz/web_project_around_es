// components/UserInfo.js
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

  setUserInfo({ name, job}) {
    this._nameElement.textContent = name;
    this._professionElement.textContent = job;
  }

  setUserAvatar(avatarUrl) {
    this._avatarElement.src = avatarUrl;
  }
}

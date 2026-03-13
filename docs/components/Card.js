export default class Card {
  constructor(
    { isLiked, _id, title, link },
    templateSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick,
  ) {
    this._title = title;
    this._link = link;
    this._isLiked = isLiked;
    this._id = _id;

    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._isLiked = !this._isLiked;
      this._handleLikeClick(this._id, !this._isLiked);
      this._likeButton.classList.toggle("card__like-button_is-active");
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
    });

    this._image.addEventListener("click", () => {
      this._handleImageClick(this._title, this._link);
    });
  }

  _handleImageError() {
    this._image.onerror = () => {
      this._image.onerror = null;
      this._image.src = "../src/images/placeholder.jpg";
    };
  }

  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector(".card__image");
    this._titleElement = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._titleElement.textContent = this._title;
    this._image.src = this._link;
    this._image.alt = this._title;

    this._handleImageError();
    this._setEventListeners();

    return this._element;
  }
}

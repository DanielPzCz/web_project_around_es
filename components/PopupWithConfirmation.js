import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm, _handleLoading) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._handleLoading = _handleLoading;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__button");
  }

  open(id, element) {
    this._id = id;
    this._element = element;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleLoading(true);
      Promise.resolve(this._handleConfirm(this._id, this._element))
        .then(() => this.close())
        .catch(console.error)
        .finally(() => this._handleLoading(false));
    });
  }
}

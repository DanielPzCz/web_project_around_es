import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, _handleLoading) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleLoading = _handleLoading;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector(".popup__button");
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      if (data[input.name] !== undefined) {
        input.value = data[input.name];
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleLoading(true);
      Promise.resolve(this._handleFormSubmit(this._getInputValues()))
        .then(() => this.close())
        .catch(console.error)
        .finally(() => this._handleLoading(false));
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

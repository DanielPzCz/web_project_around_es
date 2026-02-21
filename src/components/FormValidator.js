export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector),
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector,
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`,
    );

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`,
    );

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      if (!inputElement.validity.valid) return true;
      if (inputElement.type === "url") {
        return !this._isValidImageUrl(inputElement.value);
      }
      return false;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.disabled = false;
    }
  }

  _isValidImageUrl(url) {
    try {
      const parsed = new URL(url.trim());
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:")
        return false;
      const hostname = parsed.hostname;
      if (hostname.startsWith(".") || hostname.endsWith(".")) return false;
      const labels = hostname.split(".");
      if (labels.length < 2) return false;
      for (const label of labels) {
        if (!/^[a-zA-Z0-9-]{1,63}$/.test(label)) return false;
      }
      const tld = labels[labels.length - 1];
      if (!/^[a-zA-Z]{2,}$/.test(tld)) return false;
      return true;
    } catch {
      return false;
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
          this._toggleButtonState();
          return;
        }
        if (
          inputElement.type === "url" &&
          !this._isValidImageUrl(inputElement.value)
        ) {
          this._showInputError(inputElement, "Please enter a valid URL");
        } else {
          this._hideInputError(inputElement);
        }
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}

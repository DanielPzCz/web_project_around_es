export const selectors = {
  cardsContainer: ".cards__list",
  cardTemplate: "#template__card",
  profileName: ".profile__title",
  profileJob: ".profile__description",
  avatar: ".profile__image",
  avatarContainer: ".profile__avatar-container",
  editProfileButton: ".profile__edit-button",
  addCardButton: ".profile__add-button",
};

export const popups = {
  editProfile: "#edit-popup",
  addCard: "#new-card-popup",
  image: "#image-popup",
  deleteCard: "#delete-popup",
  editAvatar: "#edit-avatar-popup",
};

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export const apis = {
  userUrl: "https://around-api.es.tripleten-services.com/v1/users/me",
  cardsUrl: "https://around-api.es.tripleten-services.com/v1/cards/",
  token: "b807b23d-7b3a-4447-befc-7873398bb520",
};

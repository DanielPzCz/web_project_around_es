// pages/index.js
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

import {
  initialCards,
  selectors,
  popups,
  validationConfig,
} from "../utils/constants.js";

const userInfo = new UserInfo({
  nameSelector: selectors.profileName,
  jobSelector: selectors.profileJob,
});

const imagePopup = new PopupWithImage(popups.image);
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm(popups.editProfile, (data) => {
  userInfo.setUserInfo({ name: data.name, job: data.description });
  profilePopup.close();
});
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(popups.addCard, (data) => {
  const card = new Card(
    { title: data.placeName, link: data.link },
    selectors.cardTemplate,
    (name, link) => {
      imagePopup.open(name, link);
    },
  );
  cardSection.addItem(card.generateCard());
  addCardPopup.close();
});
addCardPopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        { title: item.name, link: item.link },
        selectors.cardTemplate,
        (name, link) => {
          imagePopup.open(name, link);
        },
      );
      cardSection.addItem(card.generateCard());
    },
  },
  selectors.cardsContainer,
);

cardSection.renderItems();

const formValidators = {};

document.querySelectorAll(validationConfig.formSelector).forEach((form) => {
  const validator = new FormValidator(validationConfig, form);
  formValidators[form.id] = validator;
  validator.enableValidation();
});

document
  .querySelector(selectors.editProfileButton)
  .addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    profilePopup.setInputValues({
      name: userData.name,
      description: userData.job,
    });
    profilePopup.open();
    formValidators["edit-profile-form"].resetValidation();
  });

document
  .querySelector(selectors.addCardButton)
  .addEventListener("click", () => {
    addCardPopup.open();
    formValidators["new-card-form"].resetValidation();
  });

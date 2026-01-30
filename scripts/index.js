import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openPopup,
  closePopup,
  handleOverlayClick,
  handleEscClose,
  validationConfig
} from "./utils.js";

const profileSection = document.querySelector(".profile");
const editProfileBtn = profileSection.querySelector(".profile__edit-button");
const newCardBtn = profileSection.querySelector(".profile__add-button");
const profileTitle = profileSection.querySelector(".profile__title");
const profileDescription = profileSection.querySelector(
  ".profile__description"
);
const popups = document.querySelectorAll(".popup");

const editProfilePopup = document.querySelector("#edit-popup");
const editFormPopup = editProfilePopup.querySelector("#edit-profile-form");
const closeEditProfileBtn = editProfilePopup.querySelector(".popup__close");

const saveEditProfileBtn = editFormPopup.querySelector(".popup__button");
const editProfileInputs = editFormPopup.querySelectorAll(".popup__input");
const nameInput = editFormPopup.querySelector(".popup__input_type_name");
const descriptionInput = editFormPopup.querySelector(
  ".popup__input_type_description"
);

const newCardPopup = document.querySelector("#new-card-popup");
const newCardFormPopup = newCardPopup.querySelector("#new-card-form");
const closeNewCardBtn = newCardPopup.querySelector(".popup__close");

const saveNewCardBtn = newCardFormPopup.querySelector(".popup__button");
const newCardInputs = newCardFormPopup.querySelectorAll(".popup__input");
const cardTitle = newCardFormPopup.querySelector(
  ".popup__input_type_card-name"
);
const cardLink = newCardFormPopup.querySelector(".popup__input_type_url");

const cardsSection = document.querySelector(".cards");
const cardsContainer = cardsSection.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#template__card")
  .content.querySelector(".card");

const bigImagePopup = document.querySelector("#image-popup");
const closeBigImageBtn = bigImagePopup.querySelector(".popup__close");

const bigImage = bigImagePopup.querySelector(".popup__image");
const bigImageCaption = bigImagePopup.querySelector(".popup__caption");

const editProfileValidator = new FormValidator(
  validationConfig,
  editFormPopup
);

const newCardValidator = new FormValidator(
  validationConfig,
  newCardFormPopup
);

const fillProfileForm = () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
};

const handleOpenEditModal = () => {
  editProfileValidator.resetValidation();
  fillProfileForm();
  openPopup(editProfilePopup);
};

const handleOpenCardModal = () => {
  newCardValidator.resetValidation();
  openPopup(newCardPopup);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(editProfilePopup);
};

const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();
  renderCard(cardTitle.value, cardLink.value, cardsContainer);
  newCardFormPopup.reset();
  closePopup(newCardPopup);
};

const handleImagePopup = (title, link) => {
  bigImage.src = link;
  bigImage.alt = title;
  bigImageCaption.textContent = title;
  openPopup(bigImagePopup);
};

const renderCard = (title, link, container) => {
  const card = new Card(
    { title, link },
    "#template__card",
    handleImagePopup
  );

  const cardElement = card.generateCard();
  container.append(cardElement);
};

popups.forEach((popup) => {
  popup.addEventListener("click", handleOverlayClick);
});

document.addEventListener("keydown", handleEscClose);

editProfileBtn.addEventListener("click", handleOpenEditModal);
newCardBtn.addEventListener("click", handleOpenCardModal);

closeEditProfileBtn.addEventListener("click", () =>
  closePopup(editProfilePopup)
);
closeNewCardBtn.addEventListener("click", () => closePopup(newCardPopup));
closeBigImageBtn.addEventListener("click", () => closePopup(bigImagePopup));

editProfilePopup.addEventListener("submit", handleProfileFormSubmit);
newCardPopup.addEventListener("submit", handleNewCardFormSubmit);

editProfileValidator.enableValidation();
newCardValidator.enableValidation();

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach(function (card) {
  renderCard(card.name, card.link, cardsContainer);
});

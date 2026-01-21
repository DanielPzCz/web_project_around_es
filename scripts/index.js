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

const openPopup = (popup) => popup.classList.add("popup_is-opened");
const closePopup = (popup) => popup.classList.remove("popup_is-opened");

const fillProfileForm = () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
};

const handleOpenEditModal = () => {
  openPopup(editProfilePopup);
  fillProfileForm();
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

const getCardElement = (title = "Sin Título", link) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImg = cardElement.querySelector(".card__image");

  cardTitle.textContent = title;
  cardImg.src = link;
  cardImg.alt = title;

  cardImg.onerror = () => {
    cardImg.onerror = null;
    cardImg.src = "../images/placeholder.jpg";
  };

  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImg.addEventListener("click", function () {
    handleImagePopup(title, link);
  });

  return cardElement;
};

const renderCard = (title, link, container) => {
  const cardElement = getCardElement(title, link);
  container.append(cardElement);
};

const handleOverlayClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

const handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

const showInputError = (popupForm, inputElement, errorMessage) => {
  const errorElement = popupForm.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (popupForm, inputElement) => {
  const errorElement = popupForm.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
};

function hasInvalidInput(inputList) {
  return Array.from(inputList).some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

editProfileBtn.addEventListener("click", handleOpenEditModal);
newCardBtn.addEventListener("click", () => openPopup(newCardPopup));

closeEditProfileBtn.addEventListener("click", () =>
  closePopup(editProfilePopup)
);
closeNewCardBtn.addEventListener("click", () => closePopup(newCardPopup));
closeBigImageBtn.addEventListener("click", () => closePopup(bigImagePopup));

editProfilePopup.addEventListener("submit", handleProfileFormSubmit);
newCardPopup.addEventListener("submit", handleNewCardFormSubmit);

editProfileInputs.forEach(function (input) {
  input.addEventListener("input", function () {
    if (!input.validity.valid) {
      showInputError(editFormPopup, input, input.validationMessage);
    } else {
      hideInputError(editFormPopup, input);
    }
    toggleButtonState(editProfileInputs, saveEditProfileBtn);
  });
});

newCardInputs.forEach(function (input) {
  input.addEventListener("input", function () {
    if (!input.validity.valid) {
      showInputError(newCardFormPopup, input, input.validationMessage);
    } else {
      hideInputError(newCardFormPopup, input);
    }
    toggleButtonState(newCardInputs, saveNewCardBtn);
  });
});

popups.forEach((popup) => {
  popup.addEventListener("click", handleOverlayClick);
});

document.addEventListener("keydown", handleEscClose);

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

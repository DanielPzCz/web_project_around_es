initialCards = [
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
  console.log(card.name);
});

const profileSection = document.querySelector(".profile");
const editProfileBtn = profileSection.querySelector(".profile__edit-button");
const profileTitle = profileSection.querySelector(".profile__title");
const profileDescription = profileSection.querySelector(
  ".profile__description"
);

const editProfilePopup = document.querySelector("#edit-popup");
const editFormPopup = editProfilePopup.querySelector("#edit-profile-form");
const closeEditProfileBtn = editProfilePopup.querySelector(".popup__close");

const saveEditProfileBtn = editFormPopup.querySelector(".popup__button");
const nameInput = editFormPopup.querySelector(".popup__input_type_name");
const descriptionInput = editFormPopup.querySelector(
  ".popup__input_type_description"
);

const fillProfileForm = () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
};

const handleOpenEditModal = () => {
  editProfilePopup.classList.add("popup_is-opened");
  fillProfileForm();
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  editProfilePopup.classList.remove("popup_is-opened");
};

editProfileBtn.addEventListener("click", handleOpenEditModal);

closeEditProfileBtn.addEventListener("click", () => {
  editProfilePopup.classList.remove("popup_is-opened");
});

editProfilePopup.addEventListener("submit", handleProfileFormSubmit);

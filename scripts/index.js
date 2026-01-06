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
const editProfilePopup = document.querySelector("#edit-popup");
const editFormPopup = editProfilePopup.querySelector("#edit-profile-form");

const editProfileBtn =
  profileSection.querySelector(".profile__edit-button");

const closeEditProfileBtn =
  editProfilePopup.querySelector(".popup__close");

const fillProfileForm = () => "";

editProfileBtn.addEventListener("click", () => {
  editProfilePopup.classList.add("popup_is-opened");
  editFormPopup.classList.add("popup_is-opened");
});

closeEditProfileBtn.addEventListener("click", () => {
  editProfilePopup.classList.remove("popup_is-opened");
});

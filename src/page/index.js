import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

import {
  selectors,
  popups,
  validationConfig,
  apis,
} from "../utils/constants.js";

const api = new Api(apis.userUrl, apis.cardsUrl, apis.token);

const userInfo = new UserInfo({
  nameSelector: selectors.profileName,
  jobSelector: selectors.profileJob,
  avatarSelector: selectors.avatar,
});

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
    userInfo.setUserAvatar(userData.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

let cardsSection;

api
  .getCards()
  .then((cardsData) => {
    cardsSection = new Section(
      {
        items: cardsData,
        renderer: (cardData) => {
          const card = new Card(
            {
              isLiked: cardData.isLiked,
              _id: cardData._id,
              title: cardData.name,
              link: cardData.link,
            },
            selectors.cardTemplate,
            (title, link) => {
              imagePopup.open(title, link);
            },
            (_id, isLiked) => {
              api.LikeCard(_id, isLiked).catch((err) => console.error(err));
            },
            (_id) => {
              deleteCardPopup.open(_id, card._element);
            },
          );
          cardsSection.addItem(card.generateCard());
          if (cardData.isLiked) {
            card._likeButton.classList.add("card__like-button_is-active");
          }
        },
      },
      selectors.cardsContainer,
    );
    cardsSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

const imagePopup = new PopupWithImage(popups.image);
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm(
  popups.editProfile,
  (data) => {
    return api
      .editUserInfo(data.name, data.description)
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          job: userData.about,
        });
      })
      .catch((err) => console.error(err));
  },
  (isLoading) => {
    if (isLoading) {
      profilePopup._submitButton.textContent = "Guardando...";
    } else {
      profilePopup._submitButton.textContent = "Guardar";
    }
  },
);
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  popups.addCard,
  (data) => {
    return api
      .addCard(data.placeName, data.link)
      .then((cardData) => {
        const card = new Card(
          {
            isLiked: cardData.isLiked,
            _id: cardData._id,
            title: cardData.name,
            link: cardData.link,
          },
          selectors.cardTemplate,
          (title, link) => {
            imagePopup.open(title, link);
          },
          (_id, isLiked) => {
            api.LikeCard(_id, isLiked).catch((err) => console.error(err));
          },
          (_id) => {
            deleteCardPopup.open(_id, card._element);
          },
        );
        addCardPopup.close();
        cardsSection.addItem(card.generateCard());
      })
      .catch((cardData) => {
        console.error(cardData);
      });
  },
  (isLoading) => {
    if (isLoading) {
      addCardPopup._submitButton.textContent = "Creando...";
    } else {
      addCardPopup._submitButton.textContent = "Crear";
    }
  },
);
addCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm(
  popups.editAvatar,
  (data) => {
    return api
      .editAvatar(data.avatarLink)
      .then((userData) => {
        userInfo.setUserAvatar(userData.avatar);
        avatarPopup.close();
      })
      .catch((err) => {
        console.error(err);
        avatarPopup.close();
      });
  },
  (isLoading) => {
    if (isLoading) {
      avatarPopup._submitButton.textContent = "Guardando...";
    } else {
      avatarPopup._submitButton.textContent = "Guardar";
    }
  },
);

avatarPopup.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation(
  popups.deleteCard,
  (id, element) => {
    return api
      .deleteCard(id)
      .then(() => {
        element.remove();
        deleteCardPopup.close();
      })
      .catch((err) => console.error(err));
  },
  (isLoading) => {
    if (isLoading) {
      deleteCardPopup._submitButton.textContent = "Eliminando...";
    } else {
      deleteCardPopup._submitButton.textContent = "Sí";
    }
  },
);

deleteCardPopup.setEventListeners();

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

document
  .querySelector(selectors.avatarContainer)
  .addEventListener("click", () => {
    avatarPopup.open();
    formValidators["edit-avatar-form"].resetValidation();
  });

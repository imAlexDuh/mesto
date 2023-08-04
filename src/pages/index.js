import './index.css';

import {
    buttonAdd, buttonEdit, formAddCard, formValidators, elementsTemplateSelector,
    elementsSelector, popupImgSelector, addPopupSelector, infoPopupSelector, nameSelector, descriptionSelector, elementsSettings, validationSettings, userAvatarSelector,
    popupNameInput, popupAboutInput, confirmPopupSelector, avatarPopupSelector, buttonChangeAvatar, formChangeAvatar
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';

const popupWithImage = new PopupWithImage(popupImgSelector);
const userInfo = new UserInfo({ nameSelector, descriptionSelector, userAvatarSelector });

let ownerId = null;
let testCard = null;

// api

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
    headers: {
        authorization: '3381e851-a258-4777-88b5-08c3a96458a6',
        'Content-Type': 'application/json'
    }
});

api.getAllData()
    .then(([userData, cardsData]) => {
        ownerId = userData._id;
        userInfo.setUserInfo(userData);
        cardsSection.renderItems(cardsData);
    })
    .catch((err) => {
        console.log(err);
    })

 // card functionality

const cardsSection = new Section({
    renderer: (data) => {
        const card = createCard(data);
        const cardElement = card.generateCard();
        cardsSection.addItem(cardElement);
    }
}, elementsSelector);

const createCard = (data) => {
    const card = new Card(data, elementsTemplateSelector, elementsSettings, ownerId, {

        checkCardClick: (data) => {
            popupWithImage.open(data);
        },

        pressLike: (data) => {
            api.pressLike(data)
                .then((data) => {
                    card.enableLikeCount(data)
                    card.enableLikeState()
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        unpressLike: (data) => {
            api.unpressLike(data)
                .then((data) => {
                    card.enableLikeCount(data)
                    card.disableLikeState()
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        checkCardDelete: () => {
            testCard = card;
            popupWithConfirmButton.open(data);
        }
    });

    return card;
}

// popups 

const popupWithConfirmButton = new PopupWithConfirm(confirmPopupSelector, {
    submit: (data) => {
        api.delete(data)
        .then(() => {
            testCard.deleteElement();
        })
        .then(() => {
            popupWithConfirmButton.close();
        })
        .catch((err) => {
            console.log(err);
        })
    }
})

const popupWithAddForm = new PopupWithForm(addPopupSelector, {
    submit: (data) => {
        popupWithAddForm.loading(true);
        api.addCard(data)
            .then((res) => {
                const card = createCard(res);
                const cardElement = card.generateCard();
                cardsSection.addItem(cardElement);
                popupWithAddForm.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupWithAddForm.loading(false);
            })
    }
})

const popupWithUserForm = new PopupWithForm(infoPopupSelector, {
    submit: (data) => {
        popupWithUserForm.loading(true);
        api.setUserInfo(data)
            .then((res) => {
                userInfo.setUserInfo(res);
                popupWithUserForm.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupWithUserForm.loading(false);
            })
    }
})

const popupWithAvatarForm = new PopupWithForm(avatarPopupSelector, {
    submit: (data) => {
        popupWithAvatarForm.loading(true);
        api.setAvatar(data)
        .then((res) => {
            userInfo.changeAvatar(res);
            popupWithAvatarForm.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupWithAvatarForm.loading(false);
        })
    }
})

// event listeners

buttonChangeAvatar.addEventListener("click", () => {
    popupWithAvatarForm.open();
    formValidators[formChangeAvatar.getAttribute('name')].toggleSubmitButtonState();
})

buttonAdd.addEventListener("click", () => {
    popupWithAddForm.open();
    formValidators[formAddCard.getAttribute('name')].toggleSubmitButtonState();
})

buttonEdit.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    popupNameInput.value = userData.name;
    popupAboutInput.value = userData.about;
    popupWithUserForm.open();
})

// validation

const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(validationSettings, formElement)
        const formName = formElement.getAttribute('name')
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(validationSettings);
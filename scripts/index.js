import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';


const profile = document.querySelector('.profile');
const buttonAdd = profile.querySelector('.profile__button');
const buttonEdit = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('#edit-popup');
const popupNameInput = popup.querySelector('#profile-name');
const popupInfoInput = popup.querySelector('#profile-info');
const formAddCard = document.forms["addform"];
const formValidators = {}

const elementsTemplateSelector = '.elements__element-template';
const elementsSelector = '.elements';
const popupImgSelector = '#img-popup';
const addPopupSelector = '#add-popup';
const infoPopupSelector = '#edit-popup';
const nameSelector = '.profile__author-name';
const descriptionSelector = '.profile__author-info';

const elementsSettings = {
    elementsSelector: '.elements',
    elementsElementSelector: '.elements__element',
    elementsPicSelector: '.elements__pic',
    elementsCardNameSelector: '.elements__card-name',
    elementsLikeSelector: '.elements__card-button',
    elementsDeleteButtonSelector: '.elements__delete-button',
    elementsPicClass: 'elements__pic',
    elementsLikeButtonClass: 'elements__card-button',
    elementsDeleteButtonClass: 'elements__delete-button',
}

const validationSettings = {
    popupsButtonSelector: '.profile-open-popup',
    formSelector: '.popup__fields',
    fieldsetSelector: '.popup__fieldset',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save-button',
    profileElementSelector: '.profile',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
}

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardsSection = new Section({
    items: initialCards,
    renderer: (element) => {
        const card = new Card(element, elementsTemplateSelector, elementsSettings, {
            checkCardClick: (element) => {
                const popupWithImage = new PopupWithImage(popupImgSelector, element);
                popupWithImage.open();
            }
        });
        const cardElement = card.generateCard();
        cardsSection.addItem(cardElement);
    }
}, elementsSelector);

cardsSection.renderItems();

const popupWithAddForm = new PopupWithForm(addPopupSelector, {
    submit: (cardData) => {
        const card = new Card(cardData, elementsTemplateSelector, elementsSettings, {
            checkCardClick: (cardData) => {
                const popupWithImage = new PopupWithImage(popupImgSelector, cardData);
                popupWithImage.open();
            }
        });
        const cardElement = card.generateCard();
        cardsSection.addItem(cardElement, 'prepend');
    }
})

const popupWithUserForm = new PopupWithForm(infoPopupSelector, {
    submit: (userData) => {
        const userInfo = new UserInfo({nameSelector, descriptionSelector});
        userInfo.setUserInfo(userData);
    }
})

buttonAdd.addEventListener("click", () => {
    popupWithAddForm.open();
    formValidators[ formAddCard.getAttribute('name') ].toggleSubmitButtonState();
})

buttonEdit.addEventListener("click", () => {
    const userInfo = new UserInfo({nameSelector, descriptionSelector});
    const userData = userInfo.getUserInfo();
    popupNameInput.value = userData.name;
    popupInfoInput.value = userData.description;
    popupWithUserForm.open();
})

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
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const profile = document.querySelector('.profile')
const popupEditProfile = document.querySelector('.popup')
const buttonEditProfile = profile.querySelector('.profile__edit-button')
const authorInfo = profile.querySelector('.profile__info')
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-button')
const popupInfo = popupEditProfile.querySelector('.popup__text-info')
const formEditProfile = popupEditProfile.querySelector('.popup__fields')
const popupNameEditProfile = popupEditProfile.querySelector('.popup__text-name')
const author = authorInfo.querySelector('.profile__author')
const profileName = author.querySelector('.profile__author-name')
const info = author.querySelector('.profile__author-info')
const popupAddCard = document.querySelector('#add-popup')
const formAddCard = popupAddCard.querySelector('#addform')
const elementNameSelector = '#photo-name'
const elementImgSelector = '#photo-link'
const buttonAdd = profile.querySelector('.profile__button')
const newCardButton = popupAddCard.querySelector('#add-popup__save-button')
const popupAddCloseButton = popupAddCard.querySelector('#add-popup__close-button')
const popupImg = document.querySelector("#img-popup")
const imgPopupCloseButton = popupImg.querySelector("#img-popup__close-button")

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

const newCard = {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}

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
    formSelector: '.popup__fields',
    fieldsetSelector: '.popup__fieldset',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save-button',
    profileElementSelector: '.profile',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
  }

const elementsTemplateSelector = '.elements__element-template';

const defaultCards = (templateSelector, cardsData, cardsSettings) => {
    const card = new Card(cardsData, templateSelector);
    card.initialize(cardsData, cardsSettings);
}

const addCard = (templateSelector, cardData, cardsSettings) => {
    const card = new Card(cardData, templateSelector);
    card.generateCard(cardData, cardsSettings);
}

const getCardData = () => {
    const cardName = popupAddCard.querySelector(elementNameSelector).value;
    const cardLink = popupAddCard.querySelector(elementImgSelector).value;
    const CardData = {
        name: cardName,
        link: cardLink,
    }

    return CardData;
}

const setFormValidation = (settings, formElement) => {
    const formValidator = new FormValidator(settings, formElement);
    formValidator.enableValidation();
}

defaultCards(elementsTemplateSelector, initialCards, elementsSettings)
addCard(elementsTemplateSelector, newCard, elementsSettings)
setFormValidation(validationSettings, formAddCard)
setFormValidation(validationSettings, formEditProfile)

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscape)
    popup.addEventListener('click', closePopupOverlay)
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscape)
    popup.removeEventListener('click', closePopupOverlay)
}

function closePopupEscape(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

function closePopupOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        closePopup(evt.currentTarget)
    }
}

function openEditProfileForm() {
    popupNameEditProfile.value = profileName.textContent;
    popupInfo.value = info.textContent;
    openPopup(popupEditProfile);
}

function submitEditProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = popupNameEditProfile.value;
    info.textContent = popupInfo.value;
    closePopup(popupEditProfile);
}

function addCardForm() {
    const cardData = getCardData();
    addCard(elementsTemplateSelector, cardData, elementsSettings);
    formAddCard.reset();
    closePopup(popupAddCard);
}

buttonEditProfile.addEventListener('click', () => {
    openEditProfileForm();
});

buttonCloseEditProfile.addEventListener('click', () => {
    closePopup(popupEditProfile);
});

buttonAdd.addEventListener('click', () => {
    openPopup(popupAddCard);
    newCardButton.classList.add(validationSettings.inactiveButtonClass);
    newCardButton.disabled = true;
});

formAddCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    addCardForm();
})

popupAddCloseButton.addEventListener('click', () => {
    closePopup(popupAddCard);
});

imgPopupCloseButton.addEventListener('click', () => {
    closePopup(popupImg);
});

formEditProfile.addEventListener('submit', submitEditProfileForm);
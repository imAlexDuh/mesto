import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const profile = document.querySelector('.profile')
const popupEditProfile = document.querySelector('.popup')
const cardSection = document.querySelector('.elements')
const buttonEditProfile = profile.querySelector('.profile__edit-button')
const authorInfo = profile.querySelector('.profile__info')
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-button')
const popupInfo = popupEditProfile.querySelector('.popup__text-info')
const formEditProfile = document.forms["popup-form"];
const popupNameEditProfile = popupEditProfile.querySelector('.popup__text-name')
const author = authorInfo.querySelector('.profile__author')
const profileName = author.querySelector('.profile__author-name')
const info = author.querySelector('.profile__author-info')
const popupAddCard = document.querySelector('#add-popup')
const formAddCard = document.forms["addform"]
const buttonAdd = profile.querySelector('.profile__button')
const popupAddCloseButton = popupAddCard.querySelector('#add-popup__close-button')
const popupImg = document.querySelector("#img-popup")
const imgPopupCloseButton = popupImg.querySelector("#img-popup__close-button")
const img = popupImg.querySelector(".popup__image")
const imgName = popupImg.querySelector(".popup__image-name")
const formValidators = {}

const elementNameSelector = '#photo-name'
const elementImgSelector = '#photo-link'
const cardName = popupAddCard.querySelector(elementNameSelector)
const cardLink = popupAddCard.querySelector(elementImgSelector)

const elementsTemplateSelector = '.elements__element-template';

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

function createCard(cardData) {
    const card = new Card(cardData, elementsTemplateSelector, elementsSettings, checkCardClick);
    const cardElement = card.generateCard();
    return cardElement;
}

initialCards.forEach(cardData => {
    const card = createCard(cardData);
    cardSection.append(card);
})

function handleCardFormSubmtit() {
    const cardElement = createCard({
        name: cardName.value,
        link: cardLink.value,
    })
    cardSection.prepend(cardElement);
    closePopup(popupAddCard);
    formAddCard.reset();
}

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

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscape)
    popup.addEventListener('click', closePopupOverlay)
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscape);
    popup.removeEventListener('click', closePopupOverlay);
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
    formValidators[ formEditProfile.getAttribute('name') ].toggleSubmitButtonState();
    openPopup(popupEditProfile);
}

function submitEditProfileForm(evt) {
    profileName.textContent = popupNameEditProfile.value;
    info.textContent = popupInfo.value;
    closePopup(popupEditProfile);
}

function checkCardClick(name, link) {
    img.src = link;
    imgName.textContent = name;
    img.alt = name;
    openPopup(popupImg);
}

buttonEditProfile.addEventListener('click', () => {
    openEditProfileForm();
});

buttonAdd.addEventListener('click', () => {
    openPopup(popupAddCard);
});

buttonCloseEditProfile.addEventListener('click', () => {
    closePopup(popupEditProfile);
});

formAddCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleCardFormSubmtit();
    formValidators[ formAddCard.getAttribute('name') ].toggleSubmitButtonState();
})

formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitEditProfileForm();
    formValidators[ formEditProfile.getAttribute('name') ].toggleSubmitButtonState();
})

popupAddCloseButton.addEventListener('click', () => {
    closePopup(popupAddCard);
});

imgPopupCloseButton.addEventListener('click', () => {
    closePopup(popupImg);
});
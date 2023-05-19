const profile = document.querySelector('.profile')
const popup = document.querySelector('.popup')
const editButton = profile.querySelector('.profile__edit-button')
const authorInfo = profile.querySelector('.profile__info')
const closeButton = popup.querySelector('.popup__close-button')
const popupInfo = popup.querySelector('.popup__text-info')
const formElement = popup.querySelector('.popup__fields')
const popupName = popup.querySelector('.popup__text-name')
const author = authorInfo.querySelector('.profile__author')
const profileName = author.querySelector('.profile__author-name')
const info = author.querySelector('.profile__author-info')
const addPopup = document.querySelector('#add-popup')
const elements = document.querySelector('.elements')
const elementsTemplate = document.querySelector('.elements__element-template').content
const form = popup.querySelector('#popup-form')
const addForm = addPopup.querySelector('#addform')
const elementName = addPopup.querySelector('.popup__text-name')
const elementImg = addPopup.querySelector('.popup__text-img')
const addButton = profile.querySelector('.profile__button')
const newCardButton = addPopup.querySelector('#add-popup__save-button')
const addPopupCloseButton = addPopup.querySelector('#add-popup__close-button')
const imgPopup = document.querySelector("#img-popup")
const img = imgPopup.querySelector(".popup__image")
const imgName = imgPopup.querySelector(".popup__image-name")
const imgPopupCloseButton = imgPopup.querySelector("#img-popup__close-button")

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

function editPopupOpen() {
    popupName.value = profileName.textContent;
    popupInfo.value = info.textContent;
    popup.classList.add('popup_opened');
}

function popupClose() {
    popup.classList.remove('popup_opened')
}

function addPopupOpen() {
    addPopup.classList.add('popup_opened');
}

function addPopupClose() {
    addPopup.classList.remove('popup_opened')
}

function imgPopupOpen() {
    imgPopup.classList.add('popup_opened');
}

function imgPopupClose() {
    imgPopup.classList.remove('popup_opened')
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    info.textContent = popupInfo.value;
    popupClose();
}

function addElement(evt) {
    evt.preventDefault();
    renderElements(elementName.value, elementImg.value);
    addPopupClose(addPopup);
}

const renderElements = (name, link) => {
    elements.prepend(createElement(name, link));
}

function returnElement(name, link) {
    const cardElement = elementsTemplate.querySelector('.elements__element').cloneNode(true);
    cardElement.querySelector('.elements__card-name').textContent = name;
    cardElement.querySelector('.elements__pic').src = link;
    return cardElement;
}

function createElement(name, link) {
    const cardElement = returnElement(name, link);

    const likeButton = cardElement.querySelector('.elements__card-button');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('elements__card-button_active');
    });

    cardElement.querySelector('.elements__delete-button').addEventListener('click', () => {
        cardElement.remove();
      });

      cardElement.querySelector('.elements__pic').addEventListener('click', () => {
        imgName.textContent = name;
        img.src = link;
        img.alt = name;
        imgPopupOpen();
      });

    return cardElement;
}

const defaultcards = initialCards.map(({ name, link }) => createElement(name, link));
elements.prepend(...defaultcards);

editButton.addEventListener('click', editPopupOpen)
closeButton.addEventListener('click', popupClose)
addButton.addEventListener('click', addPopupOpen)
addPopupCloseButton.addEventListener('click', addPopupClose)
imgPopupCloseButton.addEventListener('click', imgPopupClose)
formElement.addEventListener('submit', handleFormSubmit);
addForm.addEventListener('submit', addElement);
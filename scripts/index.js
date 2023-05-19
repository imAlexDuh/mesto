const profile = document.querySelector('.profile')
const popupEditProfile = document.querySelector('.popup')
const buttonEditProfile = profile.querySelector('.profile__edit-button')
const authorInfo = profile.querySelector('.profile__info')
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-button')
const popupInfo = popupEditProfile.querySelector('.popup__text-info')
const elementForm = popupEditProfile.querySelector('.popup__fields')
const popupNameEditProfile = popupEditProfile.querySelector('.popup__text-name')
const author = authorInfo.querySelector('.profile__author')
const profileName = author.querySelector('.profile__author-name')
const info = author.querySelector('.profile__author-info')
const popupAdd = document.querySelector('#add-popup')
const elements = document.querySelector('.elements')
const elementsTemplate = document.querySelector('.elements__element-template').content
const form = popupEditProfile.querySelector('#popup-form')
const formAdd = popupAdd.querySelector('#addform')
const elementName = popupAdd.querySelector('.popup__text-name')
const elementImg = popupAdd.querySelector('.popup__text-img')
const buttonAdd = profile.querySelector('.profile__button')
const newCardButton = popupAdd.querySelector('#add-popup__save-button')
const popupAddCloseButton = popupAdd.querySelector('#add-popup__close-button')
const imgPopup = document.querySelector("#img-popup")
const img = imgPopup.querySelector(".popup__image")
const imgName = imgPopup.querySelector(".popup__image-name")
const imgPopupCloseButton = imgPopup.querySelector("#img-popup__close-button")


function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}


function editPopupOpen() {
    popupNameEditProfile.value = profileName.textContent;
    popupInfo.value = info.textContent;
    popupEditProfile.classList.add('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupNameEditProfile.value;
    info.textContent = popupInfo.value;
    closePopup(popupEditProfile);
}

function addElement(evt) {
    evt.preventDefault();
    renderElements(elementName.value, elementImg.value);
    formAdd.reset();
    closePopup(popupAdd);
}

const renderElements = (name, link) => {
    elements.prepend(createElement(name, link));
}

function returnElement(name, link) {
    const cardElement = elementsTemplate.querySelector('.elements__element').cloneNode(true);
    cardElement.querySelector('.elements__card-name').textContent = name;
    cardElement.querySelector('.elements__pic').src = link;
    cardElement.querySelector('.elements__pic').alt = name;
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
        openPopup(imgPopup);
    });

    return cardElement;
}

const defaultCards = initialCards.map(({ name, link }) => createElement(name, link));
elements.prepend(...defaultCards);

popupEditProfile.querySelector('.popup__close-button').addEventListener('click', () => {
    closePopup(popupEditProfile);
});

document.querySelector('.profile__button').addEventListener('click', () => {
    openPopup(popupAdd);
});

popupAdd.querySelector('.popup__close-button').addEventListener('click', () => {
    closePopup(popupAdd);
});

imgPopup.querySelector('.popup__close-button').addEventListener('click', () => {
    closePopup(imgPopup);
});



buttonEditProfile.addEventListener('click', editPopupOpen)
elementForm.addEventListener('submit', handleFormSubmit);
formAdd.addEventListener('submit', addElement);
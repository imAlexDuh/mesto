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
const elements = document.querySelector('.elements')
const elementsTemplate = document.querySelector('.elements__element-template').content
const form = popupEditProfile.querySelector('#popup-form')
const formAddCard = popupAddCard.querySelector('#addform')
const elementName = popupAddCard.querySelector('.popup__text-name')
const elementImg = popupAddCard.querySelector('.popup__text-img')
const buttonAdd = profile.querySelector('.profile__button')
const newCardButton = popupAddCard.querySelector('#add-popup__save-button')
const popupAddCloseButton = popupAddCard.querySelector('#add-popup__close-button')
const popupImg = document.querySelector("#img-popup")
const img = popupImg.querySelector(".popup__image")
const imgName = popupImg.querySelector(".popup__image-name")
const imgPopupCloseButton = popupImg.querySelector("#img-popup__close-button")

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscape)
    popup.addEventListener('click' , closePopupOverlay)
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscape)
    popup.removeEventListener('click' , closePopupOverlay)
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

function submitAddCardForm(evt) {
    evt.preventDefault();
    renderElements(elementName.value, elementImg.value);
    formAddCard.reset();
    closePopup(popupAddCard);
}

const renderElements = (name, link) => {
    elements.prepend(createElement(name, link));
}

function getCardTemplate(name, link) {
    const cardElement = elementsTemplate.querySelector('.elements__element').cloneNode(true);
    const elementPic = cardElement.querySelector('.elements__pic')
    cardElement.querySelector('.elements__card-name').textContent = name;
    elementPic.src = link;
    elementPic.alt = name;
    return cardElement;
}

function createElement(name, link) {
    const cardElement = getCardTemplate(name, link);

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
        openPopup(popupImg);
    });

    return cardElement;
}

const defaultCards = initialCards.map(({ name, link }) => createElement(name, link));
elements.prepend(...defaultCards);

buttonEditProfile.addEventListener('click', () => {
    openEditProfileForm();
});

buttonCloseEditProfile.addEventListener('click', () => {
    closePopup(popupEditProfile);
});

buttonAdd.addEventListener('click', () => {
    openPopup(popupAddCard);
});

popupAddCloseButton.addEventListener('click', () => {
    closePopup(popupAddCard);
});

imgPopupCloseButton.addEventListener('click', () => {
    closePopup(popupImg);
});

formEditProfile.addEventListener('submit', submitEditProfileForm);
formAddCard.addEventListener('submit', submitAddCardForm);
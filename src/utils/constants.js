const profile = document.querySelector('.profile');
export const buttonChangeAvatar = profile.querySelector('.profile__avatar-button');
export const buttonAdd = profile.querySelector('.profile__button');
export const buttonEdit = profile.querySelector('.profile__edit-button');
export const popupNameInput = document.querySelector('.popup__text-name');
export const popupAboutInput = document.querySelector('.popup__text-info');
export const formAddCard = document.forms["addform"];
export const formChangeAvatar = document.forms["avatarform"];
export const formValidators = {}

export const elementsTemplateSelector = '.elements__element-template';
export const elementsSelector = '.elements';
export const popupImgSelector = '#img-popup';
export const addPopupSelector = '#add-popup';
export const confirmPopupSelector = '#confirmation-popup';
export const avatarPopupSelector = '#avatar-popup';
export const infoPopupSelector = '#edit-popup';
export const nameSelector = '.profile__author-name';
export const descriptionSelector = '.profile__author-info';
export const userAvatarSelector = '.profile__avatar';

export const elementsSettings = {
    elementsSelector: '.elements',
    elementsElementSelector: '.elements__element',
    elementsPicSelector: '.elements__pic',
    elementsCardNameSelector: '.elements__card-name',
    elementsLikeSelector: '.elements__card-button',
    elementsDeleteButtonSelector: '.elements__delete-button',
    elementsPicClass: 'elements__pic',
    elementsLikeButtonClass: 'elements__card-button',
    elementsDeleteButtonClass: 'elements__delete-button',
    elementsLikeButtonSelector: '.elements__card-count',
    elementsActiveButtonClass: 'elements__card-button_active',
}

export const validationSettings = {
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
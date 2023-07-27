import './index.css';

import {
    buttonAdd, buttonEdit, formAddCard, formValidators, elementsTemplateSelector,
    elementsSelector, popupImgSelector, addPopupSelector, infoPopupSelector, nameSelector, descriptionSelector, elementsSettings, validationSettings, initialCards
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const popupWithImage = new PopupWithImage(popupImgSelector);
const userInfo = new UserInfo({ nameSelector, descriptionSelector });

function createCard(cardData) {
    const card = new Card(cardData, elementsTemplateSelector, elementsSettings, {
        checkCardClick: (cardData) => {
            popupWithImage.open(cardData);
        }
    });
    const cardElement = card.generateCard();
    return cardElement
}

const cardsSection = new Section({
    items: initialCards,
    renderer: (cardData) => {
        cardsSection.addItem(createCard(cardData));
    }
}, elementsSelector);

cardsSection.renderItems();

const popupWithAddForm = new PopupWithForm(addPopupSelector, {
    submit: (cardData) => {
        cardsSection.addItem(createCard(cardData));
    }
})

const popupWithUserForm = new PopupWithForm(infoPopupSelector, {
    submit: (userData) => {
        userInfo.setUserInfo(userData);
    }
})

buttonAdd.addEventListener("click", () => {
    popupWithAddForm.open();
    formValidators[formAddCard.getAttribute('name')].toggleSubmitButtonState();
})

buttonEdit.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    popupWithUserForm.setInputValues(userData);
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
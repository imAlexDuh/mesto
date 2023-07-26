import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector, cardData) {
        super(popupSelector);
        this._cardData = cardData;
    }

    open() {
        this._popupElement.querySelector(".popup__image").src = this._cardData.link;
        this._popupElement.querySelector(".popup__image").alt = this._cardData.name;
        this._popupElement.querySelector(".popup__image-name").textContent = this._cardData.name;
        super.open();
    }
}
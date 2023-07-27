import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupsImg = this._popupElement.querySelector(".popup__image");
        this._popupsImgName = this._popupElement.querySelector(".popup__image-name");
        
    }

    open(cardData) {
        this._popupsImg.src = cardData.link;
        this._popupsImg.alt = cardData.name;
        this._popupsImgName.textContent = cardData.name;
        super.open();
    }
}
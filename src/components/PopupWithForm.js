import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, { submit }) {
        super(popupSelector);
        this._form = this._popupElement.querySelector(".popup__fields");
        this._submit = submit;
        this._submitEHandler = this._submitEHandler.bind(this);
        this._inputList = Array.from(this._form.querySelectorAll(".popup__text"));
    }

    _getInputValues() {
        const cardData = {};
        this._inputList.forEach(input => {
            const inputName = input.getAttribute('name');
            cardData[inputName] = input.value;
        })
        return cardData;
    }

    close() {
        this._form.removeEventListener("submit", this._submitEHandler);
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        this._form.addEventListener("submit", this._submitEHandler);
        super.setEventListeners();
    }

    _submitEHandler(e) {
        e.preventDefault();
        this._submit(this._getInputValues());
        this.close();
    }

    setInputValues(userData) {
        this._inputList.forEach((input) => {
            input.value = userData[input.name];
        });
    }
}
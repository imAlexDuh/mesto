import { Popup } from './Popup.js'

export class PopupWithConfirm extends Popup {
    constructor(popupSelector, { submit }) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._form = this._popup.querySelector('.popup__fields');
        this._submit = submit;
        this._submitEHandler = this._submitEHandler.bind(this);
    }

    open(data) {
        this._data = data;
        super.open();
    }

    _submitEHandler(e) {
        e.preventDefault();
        this._submit(this._data);
        this._form.removeEventListener("submit", this._submitEHandler);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", this._submitEHandler);
    }
}
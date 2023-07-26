export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector);
        this._handleCloseByClick = this._handleCloseByClick.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this.setEventListeners();
        this._popupElement.classList.add("popup_opened");
    }

    close() {
        this._removeEventListeners();
        this._popupElement.classList.remove("popup_opened");
    }

    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    _handleCloseByClick(e) {
        if (e.target.classList.contains("popup__close-button") || e.target.classList.contains("popup")) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener("click", this._handleCloseByClick);
        document.addEventListener("keydown", this._handleEscClose);
    }

    _removeEventListeners() {
        this._popupElement.removeEventListener("click", this._handleCloseByClick);
        document.removeEventListener("keydown", this._handleEscClose);
    }
}
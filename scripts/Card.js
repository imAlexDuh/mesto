class Card {
    constructor(cardData, templateSelector, settings, checkCardClick) {
        this._cardData = cardData;
        this._templateSelector = templateSelector;
        this._settings = settings;
        this._checkCardClick = checkCardClick;
    }

    _getPhotoElement() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .firstElementChild
        .cloneNode(true);
        return cardElement
    }

    _like() {
       this._likeButton.classList.toggle("elements__card-button_active");
    }

    _remove() {
        this._removeButton.closest(".elements__element").remove();
    }

    _setEventListeners() {
        this._cardImg.addEventListener("click", () => {
            this._checkCardClick(this._cardData.name, this._cardData.link);
        })
        this._likeButton.addEventListener("click", () => {
            this._like(this._cardData);
        })
        this._removeButton.addEventListener("click", () =>{
            this._remove(this._cardData);
        })
    }

    generateCard() {
        this._element = this._getPhotoElement();
        this._cardImg = this._element.querySelector(this._settings.elementsPicSelector);
        this._cardName = this._element.querySelector(this._settings.elementsCardNameSelector);
        this._likeButton = this._element.querySelector(this._settings.elementsLikeSelector);
        this._removeButton = this._element.querySelector(this._settings.elementsDeleteButtonSelector);
        this._cardImg.src = this._cardData.link;
        this._cardImg.alt = this._cardData.name;
        this._cardName.textContent = this._cardData.name;
        this._setEventListeners();
        return this._element;
    }
}

export { Card }
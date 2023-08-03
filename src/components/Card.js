class Card {
    constructor(data, templateSelector, settings, ownerId, { checkCardClick, pressLike, unpressLike, checkCardDelete }) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._settings = settings;
        this._checkCardClick = checkCardClick;
        this._ownerId = ownerId;
        this._pressLike = pressLike;
        this._unpressLike = unpressLike;
        this._checkCardDelete = checkCardDelete;
    }

    _getPhotoElement() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .firstElementChild
            .cloneNode(true);
        return cardElement
    }

    _like(data) {
        this._likeButton.classList.toggle("elements__card-button_active");
        this._pressLike(data);
    }

    _dislike(data) {
        this._likeButton.classList.remove("elements__card-button_active");
        this._unpressLike(data);
    }

    enableLikeCount(data) {
        this._likeButtonCount.textContent = String(data.likes.length);
    }

    _removeElememt(element) {
        element.remove();
        element = null;
    }

    _checkCardsOwner() {
        if (this._data.owner._id !== this._ownerId) {
            this._removeElememt(this._removeButton);
        }
    }

    deleteElement() {
        this._removeElememt(this._element);
    }

    _setEventListeners() {
        this._cardImg.addEventListener("click", () => {
            this._checkCardClick(this._data);
        })
        this._likeButton.addEventListener("click", () => {
            if (this._likeButton.classList.contains(this._settings.elementsActiveButtonClass)) {
                this._dislike(this._data);
            } else {
                this._like(this._data);
            }
        })
        this._removeButton.addEventListener("click", () => {
            this._checkCardDelete();
        })
    }

    generateCard() {
        this._element = this._getPhotoElement();
        this._cardImg = this._element.querySelector(this._settings.elementsPicSelector);
        this._cardName = this._element.querySelector(this._settings.elementsCardNameSelector);
        this._likeButton = this._element.querySelector(this._settings.elementsLikeSelector);
        this._likeButtonCount = this._element.querySelector(this._settings.elementsLikeButtonSelector)
        this._removeButton = this._element.querySelector(this._settings.elementsDeleteButtonSelector);
        this._cardImg.src = this._data.link;
        this._cardImg.alt = this._data.name;
        this._cardName.textContent = this._data.name;
        this.enableLikeCount(this._data);
        this._checkCardsOwner();
        this._setEventListeners();
        return this._element;
    }
}

export { Card }
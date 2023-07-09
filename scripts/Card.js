class Card {
    constructor(cardData, templateSelector) {
        this._CardData = cardData;
        this._templateSelector = templateSelector;
    }

    _getPhotoElement(cardsSettings) {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector(cardsSettings.elementsElementSelector)
    }

    _like(evt) {
        evt.target.classList.toggle("elements__card-button_active");
    }

    _remove(evt) {
        evt.target.closest(".elements__element").remove();
    }

    _openPopup(evt) {
        const cardElement = evt.target.parentElement;
        const imgElement = cardElement.querySelector(".elements__pic");
        const cardNameElement = cardElement.querySelector(".elements__card-name");
        const imgPopup = document.querySelector("#img-popup");
        const popupsImg = imgPopup.querySelector(".popup__image");
        const popupsCardName = imgPopup.querySelector(".popup__image-name");
        popupsImg.src = imgElement.src;
        popupsCardName.textContent = cardNameElement.textContent;
        imgPopup.classList.add("popup_opened");
    }

    _closePopup(imgPopup) {
        imgPopup.classList.remove("popup_opened");
    }

    _setEventListeners(cardsList, cardsSettings) {
        cardsList.addEventListener("click", (evt) => {
            if (evt.target.classList.contains(cardsSettings.elementsLikeButtonClass)) {
                this._like(evt);
            } else if (evt.target.classList.contains(cardsSettings.elementsDeleteButtonClass)) {
                this._remove(evt);
            } else if (evt.target.classList.contains(cardsSettings.elementsPicClass)) {
                this._openPopup(evt);
            }
        })

        const imgPopup = document.querySelector("#img-popup");
        const popupImg = document.querySelector(".popup__img");

        document.addEventListener("keydown", (evt) => {
            if (imgPopup.classList.contains("popup_opened") && evt.key === "Escape") {
                this._closePopup(imgPopup);
            }
        })

        imgPopup.addEventListener("click", (evt) => {
            if (imgPopup.classList.contains("popup_opened") && !evt.composedPath().includes(popupImg)) {
                this._closePopup(imgPopup);
            }
        })
    }


    generateCard(cardData, cardsSettings) {
        this._cardElement = this._getPhotoElement(cardsSettings).cloneNode(true);
        this._cardElement.querySelector(cardsSettings.elementsPicSelector).src = cardData.link;
        this._cardElement.querySelector(cardsSettings.elementsPicSelector).alt = cardData.name;
        this._cardElement.querySelector(cardsSettings.elementsCardNameSelector).textContent = cardData.name;
        document.querySelector(cardsSettings.elementsSelector).prepend(this._cardElement);
    }

    initialize(cardsData, cardsSettings) {
        const cardsList = document.querySelector(cardsSettings.elementsSelector);
        const cardElement = this._getPhotoElement(cardsSettings);

        cardsData.forEach(element => {
            const card = cardElement.cloneNode(true);
            card.querySelector(cardsSettings.elementsPicSelector).src = element.link;
            card.querySelector(cardsSettings.elementsPicSelector).alt = element.name;
            card.querySelector(cardsSettings.elementsCardNameSelector).textContent = element.name;
            cardsList.append(card)
        });
        this._setEventListeners(cardsList, cardsSettings)
    }
}

export { Card }
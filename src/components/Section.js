export class Section {
    constructor({ renderer }, conSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(conSelector);
    }

    renderItems(cardsData) {
        cardsData.forEach(card => {
            card.forEach(element =>
                this._renderer(element));
        });
    }

    addItem(domElement) {
        this._container.prepend(domElement);
    }
}
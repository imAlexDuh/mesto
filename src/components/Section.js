export class Section {
    constructor({ renderer }, conSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(conSelector);
    }

    renderItems(cardsData) {
        cardsData.forEach(card => {
                this._renderer(card);
        });
    }

    addItem(domElement) {
        this._container.prepend(domElement);
    }
}
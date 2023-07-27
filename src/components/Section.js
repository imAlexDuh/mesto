export class Section {
    constructor({ items, renderer }, conSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(conSelector);
    }

    renderItems() {
        this._items.forEach(element => {
            this._renderer(element);
        });
    }

    addItem(domElement) {
        this._container.prepend(domElement);
    }
}
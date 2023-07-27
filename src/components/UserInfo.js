export class UserInfo {
    constructor({nameSelector, descriptionSelector}) {
        this._nameSelector = nameSelector;
        this._descriptionSelector = descriptionSelector;
        this._userName = document.querySelector(this._nameSelector);
        this._userDescription = document.querySelector(this._descriptionSelector);
    }

    getUserInfo() {
        const userData = {
            name: this._userName.textContent,
            description: this._userDescription.textContent
        };
        return userData;
    }

    setUserInfo(userData) {
        this._userName.textContent = userData.name;
        this._userDescription.textContent = userData.description;
    }
}
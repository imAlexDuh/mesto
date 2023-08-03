export class UserInfo {
    constructor({nameSelector, descriptionSelector, userAvatarSelector}) {
        this._nameSelector = nameSelector;
        this._descriptionSelector = descriptionSelector;
        this._userAvatarSelector = userAvatarSelector;
        this._userName = document.querySelector(this._nameSelector);
        this._userDescription = document.querySelector(this._descriptionSelector);
        this._userAvatar = document.querySelector(this._userAvatarSelector);
    }
    
    getUserInfo() {
        const data = {
            name: this._userName.textContent,
            about: this._userDescription.textContent
        };
        return data;
    }

    changeAvatar(data) {
        this._userAvatar.src = data.avatar;
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userDescription.textContent = data.about;
        this.changeAvatar(data);
    }
}
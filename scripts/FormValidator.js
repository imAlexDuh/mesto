class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

    _getErrorElement(inputElement) {
        return this._formElement.querySelector(`#${inputElement.id}-error`);
    }

    _showInputError(inputElement, errorMessage, errorElement) {
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    }

    _hideInputError(inputElement, errorElement) {
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = "";
    }

    _hasInvalidInput(formInputs) {
        return formInputs.some(inputElement => {
            return !inputElement.validity.valid;
        })
    }

    _checkInputValidity(inputElement) {
        const errorElement = this._getErrorElement(inputElement);
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage, errorElement);
        } else {
            this._hideInputError(inputElement, errorElement);
        }
    }

    _openedCheckValidity(formInputs, formSubmitButton) {
        const profileElement = document.querySelector(this._settings.profileElementSelector);
        profileElement.addEventListener('click', (e) => {
            if (e.target.classList.contains(this._settings.addCardButtonClass) || e.target.classList.contains(this._settings.editProfileButtonClass)) {
                formInputs.forEach((inputElement) => {
                    this._checkInputValidity(inputElement);
                    this._toggleSubmitButtonState(formInputs, formSubmitButton);
                });
            }
        })
    }

    _toggleSubmitButtonState(formInputs, formSubmitButton) {
        if (this._hasInvalidInput(formInputs)) {
            formSubmitButton.disabled = true;
            formSubmitButton.classList.add(this._settings.inactiveButtonClass);
        } else {
            formSubmitButton.disabled = false;
            formSubmitButton.classList.remove(this._settings.inactiveButtonClass);
        }
    }

    _inputEventListener(e, formInputs, formSubmitButton) {
        const inputElement = e.target;
        this._checkInputValidity(inputElement);
        this._toggleSubmitButtonState(formInputs, formSubmitButton);
    }

    _setEventListeners(fieldset) {
        const formInputs = Array.from(fieldset.querySelectorAll(this._settings.inputSelector));
        const formSubmitButton = fieldset.querySelector(this._settings.submitButtonSelector);
        this._toggleSubmitButtonState(formInputs, formSubmitButton);
        formInputs.forEach(inputElement => {
            inputElement.addEventListener('input', (e) => {
                this._inputEventListener(e, formInputs, formSubmitButton);
            });
        });
        this._openedCheckValidity(formInputs, formSubmitButton);
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (e) => {
            e.preventDefault();
        })
        const fieldsetList = Array.from(this._formElement.querySelectorAll(this._settings.fieldsetSelector));
        fieldsetList.forEach(fieldset => {
            this._setEventListeners(fieldset);
        })
    }
}

export { FormValidator }
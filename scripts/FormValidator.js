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

    _toggleSubmitButtonState() {
        if (this._hasInvalidInput(this._formInputs)) {
            this._formSubmitButton.disabled = true;
            this._formSubmitButton.classList.add(this._settings.inactiveButtonClass);
        } else {
            this._formSubmitButton.disabled = false;
            this._formSubmitButton.classList.remove(this._settings.inactiveButtonClass);
        }
    }

    _inputEventListener(e) {
        const inputElement = e.target;
        this._checkInputValidity(inputElement);
        this._toggleSubmitButtonState();
    }

 _hideErrorMessage() {
        this._formInputs.forEach((element) => {
          const errorElement = this._getErrorElement(element);
          this._hideInputError(element, errorElement);
        });
      }

    _setEventListeners() {
        this._formElement.addEventListener("reset", () => {
            this._hideErrorMessage();
        })

        this._formInputs = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this._formSubmitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
        this._buttonsList = Array.from(document.querySelectorAll(this._settings.popupsButtonSelector));

        this._buttonsList.forEach(button => {
            button.addEventListener("click", () => {
                console.log(this._buttonsList);
                this._toggleSubmitButtonState();
            })
        })
        this._toggleSubmitButtonState();
        this._formInputs.forEach(inputElement => {
            inputElement.addEventListener("input", (e) => {
                this._inputEventListener(e);
            })
        })
    }

    enableValidation() {
        this._formElement.addEventListener("submit", (e) => {
            e.preventDefault();
        });
            this._setEventListeners();
        }
}

export { FormValidator }
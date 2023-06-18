const validationSettings = {
  formSelector: '.popup__fields',
  fieldsetSelector: '.popup__fieldset',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

function showInputError(formElement, inputElement, errorMessage, validationSettings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
}

function hideInputError(formElement, inputElement, validationSettings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = "";
}

function hasInvalidInput(formInputs) {
  return formInputs.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

function checkInputValidity(formElement, inputElement, validationSettings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
}

function toggleSubmitButtonState(formInputs, formSubmitButton, validationSettings) {
  if (hasInvalidInput(formInputs)) {
    formSubmitButton.disabled = true;
    formSubmitButton.classList.add(validationSettings.inactiveButtonClass);
  } else {
    formSubmitButton.disabled = false;
    formSubmitButton.classList.remove(validationSettings.inactiveButtonClass);
  }
}

function setEventListeners(formElement, validationSettings) {
  const formInputs = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const formSubmitButton = formElement.querySelector(validationSettings.submitButtonSelector);
  toggleSubmitButtonState(formInputs, formSubmitButton, validationSettings);
  formInputs.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationSettings);
      toggleSubmitButtonState(formInputs, formSubmitButton, validationSettings);
    })
  })
}


function enableValidation(validationSettings) {
  const formsList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formsList.forEach(formElement => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    const fieldsetList = Array.from(formElement.querySelectorAll(validationSettings.fieldsetSelector));
    fieldsetList.forEach(fieldset => {
      setEventListeners(fieldset, validationSettings);
    })
  })
}

enableValidation(validationSettings);
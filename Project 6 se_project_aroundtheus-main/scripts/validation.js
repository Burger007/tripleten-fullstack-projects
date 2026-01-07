function showInputError(formEl, inputEl, options) {
  const errorMessageEl = formEl.querySelector("#" + inputEl.id + `-error`);
  inputEl.classList.add(options.inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(options.errorClass);
}

function hideInputError(formEl, inputEl, options) {
  const hideErrorMessage = formEl.querySelector("#" + inputEl.id + `-error`);
  inputEl.classList.remove(options.inputErrorClass);
  hideErrorMessage.textContent = "";
  hideErrorMessage.classList.remove(options.errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function toggleButtonState(inputEls, submitButton, options) {
  let foundInvalid = false;
  inputEls.forEach((input) => {
    if (!input.validity.valid) {
      foundInvalid = true;
    }
  });

  if (foundInvalid) {
    disableButton(submitButton, options);
  } else {
    submitButton.classList.remove(options.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

//Setting Event Listerners
function setEventListerners(formEl, options) {
  const { inputSelector } = options;

  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const { submitButtonSelector } = options;
  const submitButton = formEl.querySelector(config.submitButtonSelector);
  toggleButtonState(inputEls, submitButton, options);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (evt) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListerners(formEl, options);
  });
}

//Reset Valiadation
const resetValidation = (formEl, config) => {
  const inputEls = [...formEl.querySelectorAll(config.inputSelector)];
  inputEls.forEach((inputEl) => {
    hideInputError(formEl, inputEl, config);
  });

  const submitButton = formEl.querySelector(config.submitButtonSelector);
  toggleButtonState(inputEls, submitButton, config);
};

function disableButton(submitButton, options) {
  submitButton.classList.add(options.inactiveButtonClass);
  submitButton.disabled = true;
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);

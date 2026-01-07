//The popupWithForm class is a child class of the popup class
import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector("form");
    this.handleFormSubmit = handleFormSubmit;
    this._submitHandler = this._submitHandler.bind(this);
  }

  _getInputValues() {
    const inputs = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
    const values = {};
    inputs.forEach((input) => (values[input.name] = input.value));
    return values;
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this.handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._submitHandler);
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

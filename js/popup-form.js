'use strict';

(function () {
  var KEY_CODE_ESC = 27;
  var VALIDATION_COMMENT_LENGTH = 140;

  var closeEditingFormKeydownHandler = function () {
    window.popup.hide();
  };

  var keydownEscPressHandler = function (evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      window.popup.hide();
    }
  };

  var onLoad = function () {
    window.popup.hide();
    window.messages.createSuccessSend();
  };

  var onError = function (message) {
    window.popup.hide();
    window.messages.createFailedSend(message);
  };

  var inputHashtagsElement = document.querySelector('.text__hashtags');
  var closeEditPictureFormElement = document.querySelector('.img-upload__cancel');
  var inputCommentElement = document.querySelector('.text__description');
  var formElement = document.querySelector('#upload-select-image');

  var inputHashtagsElementFocusinHandler = function () {
    document.removeEventListener('keydown', keydownEscPressHandler);
  };

  var inputHashtagsElementFocusoutHandler = function () {
    document.addEventListener('keydown', keydownEscPressHandler);
  };

  var inputCommentElementFocusinHandler = function () {
    document.removeEventListener('keydown', keydownEscPressHandler);
  };

  var inputCommentElementFocusoutHandler = function () {
    document.addEventListener('keydown', keydownEscPressHandler);
  };

  var inputHashtagsElementChangeHandler = function () {
    var validation = window.popupFormValidation.validateTags(inputHashtagsElement.value);

    inputHashtagsElement.setCustomValidity(
        validation.isValid ? '' : validation.firstError
    );
  };

  var inputCommentElementChangeHandler = function (evt) {
    var targetElement = evt.target;
    var isValid = targetElement.value.length < VALIDATION_COMMENT_LENGTH;
    targetElement.setCustomValidity(
        isValid ? '' : window.popupFormValidation.validationErrorText.moreThanAllowCharsComment
    );
  };

  var formElementSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.sendData(onLoad, onError, new FormData(formElement));
  };

  window.popupForm = {
    activate: function () {
      formElement.reset();

      closeEditPictureFormElement.addEventListener('click', closeEditingFormKeydownHandler);

      document.addEventListener('keydown', keydownEscPressHandler);

      inputHashtagsElement.addEventListener('focusin', inputHashtagsElementFocusinHandler);
      inputHashtagsElement.addEventListener('focusout', inputHashtagsElementFocusoutHandler);
      inputHashtagsElement.addEventListener('change', inputHashtagsElementChangeHandler);

      inputCommentElement.addEventListener('focusin', inputCommentElementFocusinHandler);
      inputCommentElement.addEventListener('focusout', inputCommentElementFocusoutHandler);
      inputCommentElement.addEventListener('change', inputCommentElementChangeHandler);

      formElement.addEventListener('submit', formElementSubmitHandler);
    },
    deactivate: function () {
      closeEditPictureFormElement.removeEventListener('click', closeEditingFormKeydownHandler);

      document.removeEventListener('keydown', keydownEscPressHandler);

      inputHashtagsElement.removeEventListener('focusin', inputHashtagsElementFocusinHandler);
      inputHashtagsElement.removeEventListener('focusout', inputHashtagsElementFocusoutHandler);
      inputHashtagsElement.removeEventListener('change', inputHashtagsElementChangeHandler);

      inputCommentElement.removeEventListener('focusin', inputCommentElementFocusinHandler);
      inputCommentElement.removeEventListener('focusout', inputCommentElementFocusoutHandler);
      inputCommentElement.removeEventListener('change', inputCommentElementChangeHandler);

      formElement.removeEventListener('submit', formElementSubmitHandler);
    }
  };

})();

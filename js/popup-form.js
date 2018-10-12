'use strict';

(function () {
  var KEY_CODE_ESC = 27;
  var VALIDATION_COMMENT_LENGTH = 140;
  var errorBorderStyle = 'border: 2px solid red;';

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

  var closeEditPictureFormElement = document.querySelector('.img-upload__cancel');
  var inputHashtagsElement = document.querySelector('.text__hashtags');
  var inputCommentElement = document.querySelector('.text__description');
  var uploadPictureElement = document.querySelector('#upload-file');
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

    if (validation.isValid) {
      inputHashtagsElement.setCustomValidity('');
      inputHashtagsElement.style = '';
    } else {
      inputHashtagsElement.setCustomValidity(validation.firstError);
      inputHashtagsElement.style = errorBorderStyle;
    }

  };

  var inputCommentElementChangeHandler = function (evt) {
    var targetElement = evt.target;
    var isValid = targetElement.value.length < VALIDATION_COMMENT_LENGTH;

    if (isValid) {
      targetElement.setCustomValidity('');
      targetElement.style = '';
    } else {
      targetElement.setCustomValidity(window.popupFormValidation.validationErrorText.moreThanAllowCharsComment);
      targetElement.style = errorBorderStyle;
    }
  };

  var formElementSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.sendData(onLoad, onError, new FormData(formElement));
  };

  window.popupForm = {
    activate: function () {
      inputHashtagsElement.value = '';
      inputCommentElement.value = '';

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
      uploadPictureElement.value = '';
      inputHashtagsElement.style = '';
      inputCommentElement.style = '';

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

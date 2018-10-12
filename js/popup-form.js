'use strict';

(function () {
  var VALIDATION_TAGS_LENGTH = 5;
  var VALIDATION_TAG_LENGTH = 20;
  var VALIDATION_COMMENT_LENGTH = 140;
  var KEY_CODE_ESC = 27;
  var VALIDATION_ERROR_TEXT = {
    startWithHashError: 'Every hash must start from "#"',
    onlyHashSymbolError: 'You can\'t use only "#" for your hashtag',
    repeatTagsError: 'You can\'t use similar hashtags',
    moreThanFiveTagsError: 'You can\'t use more than 5 hashtags',
    moreThanTwentyCharsError: 'Your hashtags length can\'t be more than 20 characters',
    moreThanAllowCharsComment: 'Your comment length mast be less than 140 characters include spaces'
  };

  var validateTags = function (tagsString) {
    var normalizedTagsString = tagsString
      .toLowerCase()
      .trim()
      .replace(/\s{2,}/g, ' ');

    if (normalizedTagsString === '') {
      return {
        isValid: true,
        errors: null
      };
    }

    var checkTagsStartWithHash = function (tags) {
      var isValid = tags.every(function (tag) {
        return tag.lastIndexOf('#') === 0;
      });

      return !isValid ? VALIDATION_ERROR_TEXT.startWithHashError : null;
    };

    var checkTagsOnlyHashSymbol = function (tags) {
      var isValid = tags.some(function (tag) {
        return tag !== '#';
      });

      return !isValid ? VALIDATION_ERROR_TEXT.onlyHashSymbolError : null;
    };

    var checkTagsRepeatTags = function (tags) {
      var hasDifferentTags = function () {
        var uniqArray = {};
        tags.forEach(function (tag) {
          uniqArray[tag] = true;
        });
        var uniqArrayLength = Object.keys(uniqArray).length;

        return tags.length !== uniqArrayLength;
      };

      return hasDifferentTags() ? VALIDATION_ERROR_TEXT.repeatTagsError : null;
    };

    var checkTagsMoreThanFiveTags = function (tags) {
      return tags.length > VALIDATION_TAGS_LENGTH ? VALIDATION_ERROR_TEXT.moreThanFiveTagsError : null;
    };
    var checkTagsMoreThanTwentyChars = function (tags) {
      var isValid = tags.some(function (tag) {
        return tag.length < VALIDATION_TAG_LENGTH;
      });

      return !isValid ? VALIDATION_ERROR_TEXT.moreThanTwentyCharsError : null;
    };

    var tags = normalizedTagsString.split(' ');

    var errors = [
      checkTagsStartWithHash,
      checkTagsOnlyHashSymbol,
      checkTagsRepeatTags,
      checkTagsMoreThanFiveTags,
      checkTagsMoreThanTwentyChars
    ].reduce(function (accumulator, checkFunction) {
      var error = checkFunction(tags);

      if (error) {
        accumulator.push(error);
      }

      return accumulator;
    }, []);

    return {
      isValid: !errors.length,
      firstError: errors[0]
    };
  };

  var closeEditingFormKeydownHandler = function () {
    formElement.reset();
    uploadPictureOverlayElement.classList.add('hidden');
  };

  var keydownEscPressHandler = function (evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      closeEditingFormKeydownHandler();
    }
  };

  var inputHashtagsElement = document.querySelector('.text__hashtags');
  var closeEditPictureFormElement = document.querySelector('.img-upload__cancel');
  var uploadPictureOverlayElement = document.querySelector('.img-upload__overlay');
  var inputCommentElement = document.querySelector('.text__description');
  var formElement = document.querySelector('#upload-select-image');


  closeEditPictureFormElement.addEventListener('click', closeEditingFormKeydownHandler);
  document.removeEventListener('click', closeEditingFormKeydownHandler);

  document.addEventListener('keydown', keydownEscPressHandler);

  inputHashtagsElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', keydownEscPressHandler);
  });
  inputHashtagsElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', keydownEscPressHandler);
  });
  inputCommentElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', keydownEscPressHandler);
  });
  inputCommentElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', keydownEscPressHandler);
  });

  inputHashtagsElement.addEventListener('change', function () {
    var validation = validateTags(inputHashtagsElement.value);

    inputHashtagsElement.setCustomValidity(
        validation.isValid ? '' : validation.firstError
    );
  });

  inputCommentElement.addEventListener('change', function (evt) {
    var targetElement = evt.target;
    var isValid = targetElement.value.length < VALIDATION_COMMENT_LENGTH;
    targetElement.setCustomValidity(
        isValid ? '' : VALIDATION_ERROR_TEXT.moreThanAllowCharsComment
    );
  });

  var onLoad = function () {
    closeEditingFormKeydownHandler();
    window.messages.createSuccessSend();
  };

  var onError = function (message) {
    closeEditingFormKeydownHandler();
    window.messages.createFailedSend(message);
  };


  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.sendData(onLoad, onError, new FormData(formElement));
  });
})();

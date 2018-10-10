'use strict';

(function () {
  var VALIDATION_TAGS_LENGTH = 5;
  var VALIDATION_TAG_LENGTH = 20;
  var VALIDATION_COMMENT_LENGTH = 140;
  var KEY_CODE_ESC = 27;
  var VALIDATION_ERROR_TEXT = { // ключи объекта с маленькой буквы
    StartWithHashError: 'Every hash must start from "#"',
    OnlyHashSymbolError: 'You can\'t use only "#" for your hashtag',
    RepeatTagsError: 'You can\'t use similar hashtags',
    MoreThanFiveTagsError: 'You can\'t use more than 5 hashtags',
    MoreThanTwentyCharsError: 'Your hashtags length can\'t be more than 20 characters',
    MoreThanAllowCharsComment: 'Your comment length mast be less than 140 characters include spaces'
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
        return tag.startsWith('#');
      });

      if (!isValid) {
        return VALIDATION_ERROR_TEXT.StartWithHashError;
      }
      return null;
    };

    var checkTagsOnlyHashSymbol = function (tags) {
      var isValid = tags.some(function (tag) {
        return tag !== '#';
      });

      if (!isValid) {
        return VALIDATION_ERROR_TEXT.OnlyHashSymbolError;
      }
      return null;
    };

    var checkTagsRepeatTags = function (tags) {
      var hasDifferentTags = function () {
        var uniqArray = {};
        for (var i = 0; i < tags.length; i++) {
          uniqArray[tags[i]] = true;
        }
        var uniqArrayLength = Object.keys(uniqArray).length;
        return tags.length === uniqArrayLength ? false : true;
      };

      if (hasDifferentTags()) {
        return VALIDATION_ERROR_TEXT.RepeatTagsError;
      }
      return null;
    };

    var checkTagsMoreThanFiveTags = function (tags) {
      if (tags.length > VALIDATION_TAGS_LENGTH) {
        return VALIDATION_ERROR_TEXT.MoreThanFiveTagsError;
      }
      return null;
    };

    var checkTagsMoreThanTwentyChars = function (tags) {
      var isValid = tags.some(function (tag) {
        return tag.length < VALIDATION_TAG_LENGTH;
      });
      if (!isValid) {
        return VALIDATION_ERROR_TEXT.MoreThanTwentyCharsError;
      }
      return null;
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
      isValid: errors.length ? false : true,
      firstError: errors[0]
    };
  };

  var validateComments = function (comment) {
    if (comment === '' || comment.length < VALIDATION_COMMENT_LENGTH) {
      return true;
    }
    return false;
  };

  var closeEditingFormKeydownHandler = function () {
    uploadPictureElement.value = '';
    inputCommentElement.value = '';
    inputHashtagsElement.value = '';
    uploadPictureOverlayElement.classList.add('hidden');
  };

  var keydownEscPressHandler = function (evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      closeEditingFormKeydownHandler();
    }
  };

  var inputHashtagsElement = document.querySelector('.text__hashtags');
  var closeEditPictureFormElement = document.querySelector('.img-upload__cancel');
  var uploadPictureElement = document.querySelector('#upload-file');
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
    if (validation.isValid) {
      inputHashtagsElement.setCustomValidity('');
    } else {
      inputHashtagsElement.setCustomValidity(validation.firstError);
    }
  });

  inputCommentElement.addEventListener('change', function () {
    var isCommentValid = validateComments(inputCommentElement.value);
    if (isCommentValid) {
      inputCommentElement.setCustomValidity('');
    } else {
      inputCommentElement.setCustomValidity(VALIDATION_ERROR_TEXT.MoreThanAllowCharsComment);
    }
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

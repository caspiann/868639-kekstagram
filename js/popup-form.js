'use strict';

(function () {
  var VALIDATION_TAGS_LENGTH = 5;
  var VALIDATION_TAG_LENGTH = 20;
  var KEY_CODE_ESC = 27;
  var VALIDATION_ERROR_TEXT = {
    StartWithHashError: 'Every hash must start from "#"',
    OnlyHashSymbolError: 'You can\'t use only "#" for your hashtag',
    RepeatTagsError: 'You can\'t use similar hashtags',
    MoreThanFiveTagsError: 'You can\'t use more than 5 hashtags',
    MoreThanTwentyCharsError: 'Your hashtags length can\'t be more than 20 characters'
  };
  var inputHashtagsElement = document.querySelector('.text__hashtags');
  var closeEditPictureFormElement = document.querySelector('.img-upload__cancel');
  var uploadPictureElement = document.querySelector('#upload-file');
  var uploadPictureOverlayElement = document.querySelector('.img-upload__overlay');
  var inputCommentsElement = document.querySelector('.text__description');

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
        return tags.length === uniqArray.length ? false : true;
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

  var closeEditingFormKeydownHandler = function () {
    uploadPictureElement.value = '';
    uploadPictureOverlayElement.classList.add('hidden');
  };

  var keydownEscPressHandler = function (evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      closeEditingFormKeydownHandler();
    }
  };

  closeEditPictureFormElement.addEventListener('click', closeEditingFormKeydownHandler);
  document.removeEventListener('click', closeEditingFormKeydownHandler);

  inputHashtagsElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', keydownEscPressHandler);
  });
  inputHashtagsElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', keydownEscPressHandler);
  });
  inputCommentsElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', keydownEscPressHandler);
  });
  inputCommentsElement.addEventListener('focusout', function () {
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
})();
'use strict';

(function () {

  window.validate = {
    validateTags: function (tagsString) {
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
          return 'Every hash must start fromm "#"';
        }
        return null;
      };

      var checkTagsOnlyHashSymbol = function (tags) {
        var isValid = tags.some(function (tag) {
          return tag !== '#';
        });

        if (!isValid) {
          return 'You can\'t use only "#" for your hashtag';
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
          return 'You can\'t use similar hashtags';
        }
        return null;
      };

      var checkTagsMoreThanFiveTags = function (tags) {
        if (tags.length > window.variables.VALIDATION_TAGS_LENGTH) {
          return 'You can\'t use more than 5 hashtags';
        }
        return null;
      };

      var checkTagsMoreThanTwentyChars = function (tags) {
        var isValid = tags.some(function (tag) {
          return tag.length < window.variables.VALIDATION_TAG_LENGTH;
        });
        if (!isValid) {
          return 'Your hashtags length can\'t be more than 20 characters';
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
        isValid: !errors.length ? false : true,
        firstError: errors[0]
      };
    }
  };
})();

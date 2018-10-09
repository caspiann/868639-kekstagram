'use strict';

(function () {

  var NEW_PHOTO_MIN = 0;
  var NEW_PHOTO_MAX = 10;

  var generateNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  window.picturesFilter = {
    getNewPictures: function (data) {
      var newPictures = data.slice();
      var resultArr = [];
      for (var i = NEW_PHOTO_MIN; i < NEW_PHOTO_MAX; i++) {
        var element = newPictures[generateNumber(NEW_PHOTO_MIN, NEW_PHOTO_MAX)];
        if (resultArr.indexOf(element) !== -1) {
          element = newPictures[generateNumber(NEW_PHOTO_MIN, NEW_PHOTO_MAX)];
          i--;
        } else {
          resultArr.push(element);
        }
      }
      return resultArr;
    },
    getMostDiscussedElements: function (data) {
      var newPictures = data.slice();
      return newPictures.sort(function (first, second) {
        return second.comments.length - first.comments.length;
      });
    }
  };

})();

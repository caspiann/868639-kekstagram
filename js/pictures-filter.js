'use strict';
(function () {

  var NEW_PICTURE_MIN = 0;
  var NEW_PICTURE_MAX = 10;

  var generateNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  window.picturesFilter = {
    getNewPictures: function (pictures) {
      var newPictures = pictures.slice();
      var resultPictures = [];
      var maxNewPictureLength = 10;
      while (newPictures.length !== 0 && maxNewPictureLength > 0) {
        var index = generateNumber(NEW_PICTURE_MIN, NEW_PICTURE_MAX);
        var randomComment = newPictures[index];
        resultPictures.push(randomComment);
        newPictures.splice(index, 1);
        maxNewPictureLength--;
        index--;
      }
      return resultPictures;
    },
    getMostDiscussedElements: function (pictures) {
      return pictures.slice().sort(function (first, second) {
        return second.comments.length - first.comments.length;
      });
    }
  };

})();

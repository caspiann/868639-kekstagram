'use strict';

(function () {
  var PICTURE_FILTER_LIMIT = 10;

  var generateNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  window.picturesFilter = {
    getNewPictures: function (pictures) {
      var newPictures = pictures.slice();
      var resultPictures = [];
      var picturesLimit = PICTURE_FILTER_LIMIT;
      while (newPictures.length && picturesLimit > 0) {
        var randomIndex = generateNumber(0, newPictures.length - 1);
        var randomPicture = newPictures[randomIndex];
        resultPictures.push(randomPicture);
        newPictures.splice(randomIndex, 1);
        picturesLimit--;
      }
      return resultPictures;
    },
    getMostDiscussedElements: function (pictures) {
      return pictures.slice().sort(function (firstPicture, secondPicture) {
        return secondPicture.comments.length - firstPicture.comments.length;
      });
    }
  };
})();

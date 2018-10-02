'use strict';

(function () {
  window.data = {
    generateNumber: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    generateComments: function () {
      var total = this.generateNumber(window.variables.GENERATE_COMMENTS_MIN, window.variables.GENERATE_COMMENTS_MAX);
      var clonedComments = window.variables.COMMENTS.slice(0, window.variables.COMMENTS.length);
      var resultComments = [];
      while (clonedComments.length !== 0 && total > 0) {
        var randomComment = clonedComments[this.generateNumber(0, total)];
        resultComments.push(randomComment);
        clonedComments.splice(total, 1);
        total--;
      }
      return resultComments;
    },
    generatePicturesData: function (count) {
      var photos = [];
      for (var i = 0; i < count; i++) {
        photos.push({
          url: 'photos/' + (i + 1) + '.jpg',
          likes: this.generateNumber(window.variables.GENERATE_LIKES_MIN, window.variables.GENERATE_LIKES_MAX),
          comments: this.generateComments(),
          description: window.variables.DESCRIPTIONS[this.generateNumber(0, window.variables.DESCRIPTIONS.length - 1)]
        });
      }
      return photos;
    }
  };
})();

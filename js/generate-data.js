'use strict';

(function () {
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  var GENERATE_COMMENTS_MIN = 1;
  var GENERATE_COMMENTS_MAX = 5;
  var GENERATE_LIKES_MIN = 15;
  var GENERATE_LIKES_MAX = 200;

  var generateNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  window.generatedData = {
    generateComments: function () {
      var total = generateNumber(GENERATE_COMMENTS_MIN, GENERATE_COMMENTS_MAX);
      var clonedComments = COMMENTS.slice(0, COMMENTS.length);
      var resultComments = [];
      while (clonedComments.length !== 0 && total > 0) {
        var randomComment = clonedComments[generateNumber(0, total)];
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
          likes: generateNumber(GENERATE_LIKES_MIN, GENERATE_LIKES_MAX),
          comments: this.generateComments(),
          description: DESCRIPTIONS[generateNumber(0, DESCRIPTIONS.length - 1)]
        });
      }
      return photos;
    }
  };
})();

'use strict';

(function () {

  var GENERATE_AVATAR_MIN = 1;
  var GENERATE_AVATAR_MAX = 6;
  var PHOTOS_NUMBER = 25;
  var picturesData = window.generatedData.generatePicturesData(PHOTOS_NUMBER);
  var bigPictureCommentElement = document.querySelector('.social__comment');
  var bigPictureCommentsBlockElement = document.querySelector('.social__comments');
  var socialCommentCountElement = document.querySelector('.social__comment-count');
  var commentsLoaderElement = document.querySelector('.comments-loader');
  var pictureElements = document.querySelector('.pictures');
  var pictureTemplateElement = document.querySelector('#picture');

  var generateNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var renderPhoto = function (pictureTemplateElement, pictureData) {
    var pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.content.querySelector('.picture__img').src = pictureData.url;
    pictureElement.content.querySelector('.picture__comments').textContent =
      pictureData.comments.length;
    pictureElement.content.querySelector('.picture__likes').textContent =
      pictureData.likes;
    return pictureElement;
  };

  var renderPhotos = function (parentElement, pictureTemplateElement, picturesData) {
    var photosFragment = document.createDocumentFragment();
    picturesData.forEach(function (pictureData, index) {
      photosFragment.appendChild(
          renderPhoto(pictureTemplateElement, picturesData[index]).content
      );
    });
    parentElement.appendChild(photosFragment);
  };

  var renderBigPictureComments = function (parentElement, picturesData) {
    var commentFragments = document.createDocumentFragment();
    var commentElement = bigPictureCommentElement.cloneNode(true);
    picturesData.comments.forEach(function (comment) {
      commentElement.querySelector('.social__text').textContent = comment;
      commentElement.querySelector('.social__picture').src =
        'img/avatar-' +
        generateNumber(GENERATE_AVATAR_MIN, GENERATE_AVATAR_MAX) +
        '.svg';
      commentFragments.appendChild(commentElement);
    });
    parentElement.appendChild(commentFragments);
  };

  window.renderBigPicture = {
    renderBigPicture: function (bigPictureElement, pictureData) {
      bigPictureElement.classList.remove('hidden');
      socialCommentCountElement.classList.add('visually-hidden');
      commentsLoaderElement.classList.add('visually-hidden');
      bigPictureElement.querySelector('.big-picture__img img').src =
        pictureData.url;
      bigPictureElement.querySelector('.comments-count').textContent =
        pictureData.comments.length;
      bigPictureElement.querySelector('.likes-count').textContent =
        pictureData.likes;
      bigPictureElement.querySelector('.social__caption').textContent =
        pictureData.description;
      bigPictureElement.querySelector('.social__picture').src =
        'img/avatar-' +
        generateNumber(GENERATE_AVATAR_MIN, GENERATE_AVATAR_MAX) +
        '.svg';
      renderBigPictureComments(bigPictureCommentsBlockElement, pictureData);
    }
  };

  bigPictureCommentsBlockElement.innerHTML = '';
  renderPhotos(pictureElements, pictureTemplateElement, picturesData);
})();

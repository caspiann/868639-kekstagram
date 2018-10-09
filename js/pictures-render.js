'use strict';

(function () {
  var GENERATE_AVATAR_MIN = 1;
  var GENERATE_AVATAR_MAX = 6;
  var KEY_CODE_ESC = 27;

  var pictureTemplateElement = document.querySelector('#picture');
  var pictureElements = document.querySelector('.pictures');
  var bigPictureElement = document.querySelector('.big-picture');
  var commentTemplateElement = document.querySelector('.social__comment').cloneNode(true);
  var bigPictureCommentsBlockElement = document.querySelector('.social__comments');
  var closeBigPictureElement = bigPictureElement.querySelector('.big-picture__cancel');

  var renderPhoto = function (template, picture) {
    var pictureElement = template.cloneNode(true);
    pictureElement.content.querySelector('.picture__img').src = picture.url;
    pictureElement.content.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.content.querySelector('.picture__likes').textContent = picture.likes;
    return pictureElement;
  };

  var generateNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var renderBigPictureComments = function (parentElement, pictures) {
    bigPictureCommentsBlockElement.innerHTML = '';
    for (var i = 0; i < pictures.comments.length && i < 5; i++) {
      var commentElement = commentTemplateElement.cloneNode(true);
      commentElement.querySelector('.social__text').textContent = pictures.comments[i];
      commentElement.querySelector('.social__picture').src = 'img/avatar-' + generateNumber(GENERATE_AVATAR_MIN, GENERATE_AVATAR_MAX) + '.svg';
      parentElement.appendChild(commentElement);
    }
  };

  var renderBigPicture = function (bigPicture, pictureData) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = pictureData.url;
    bigPicture.querySelector('.comments-count').textContent = pictureData.comments.length;
    bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
    bigPicture.querySelector('.social__picture').src = 'img/avatar-' + generateNumber(GENERATE_AVATAR_MIN, GENERATE_AVATAR_MAX) + '.svg';
    renderBigPictureComments(bigPictureCommentsBlockElement, pictureData);
  };

  var closeBigPictureClickHandler = function () {
    bigPictureElement.classList.add('hidden');
    bigPictureCommentsBlockElement.innerHTML = '';
  };

  var onLoad = function (pictures) {
    pictures.forEach(function (picture) {
      window.cachePictures = pictures;
      var pictureElement = renderPhoto(pictureTemplateElement, picture);
      pictureElement.content.querySelector('a').addEventListener('click', function () {
        renderBigPicture(bigPictureElement, picture);
      });
      pictureElements.appendChild(pictureElement.content);
    });
  };

  var onError = function (message) {
    window.popupError.createLoadError(message);
  };

  window.backend.getData(onLoad, onError);

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      closeBigPictureClickHandler();
    }
  });

  closeBigPictureElement.addEventListener('click', closeBigPictureClickHandler);

})();

'use strict';

(function () {
  var GENERATE_AVATAR_MIN = 1;
  var GENERATE_AVATAR_MAX = 6;
  var KEY_CODE_ESC = 27;
  var pictureElements = document.querySelector('.pictures');
  var pictureTemplateElement = document.querySelector('#picture');
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCommentElement = document.querySelector('.social__comment');
  var bigPictureCommentsBlockElement = document.querySelector('.social__comments');
  var closeBigPictureElement = bigPictureElement.querySelector('.big-picture__cancel');

  var renderPhoto = function (pictureTemplate, pictureData) {
    var pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.content.querySelector('.picture__img').src = pictureData.url;
    pictureElement.content.querySelector('.picture__comments').textContent =
      pictureData.comments.length;
    pictureElement.content.querySelector('.picture__likes').textContent =
      pictureData.likes;
    return pictureElement;
  };

  var generateNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var renderBigPictureComments = function (parentElement, dataOfPictures) {
    var commentFragments = document.createDocumentFragment();
    for (var i = 0; i < dataOfPictures.comments.length && i < 5; i++) {
      var commentElement = bigPictureCommentElement.cloneNode(true);
      commentElement.querySelector('.social__text').textContent = dataOfPictures.comments[i];
      commentElement.querySelector('.social__picture').src = 'img/avatar-' + generateNumber(GENERATE_AVATAR_MIN, GENERATE_AVATAR_MAX) + '.svg';
      commentFragments.appendChild(commentElement);
      parentElement.appendChild(commentFragments);
    }
  };

  var renderBigPicture = function (bigPicture, pictureData) {
    bigPictureCommentsBlockElement.innerHTML = '';
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

  window.load('https://js.dump.academy/kekstagram/data', function (response) {
    window.cachePictures = response;
    var photosFragment = document.createDocumentFragment();
    response.forEach(function (pictureData, index) {
      photosFragment.appendChild(
          renderPhoto(pictureTemplateElement, response[index]).content
      );
    });
    pictureElements.appendChild(photosFragment);
    var pictureListElements = Array.prototype.slice.call(document.querySelectorAll('.picture'));
    pictureListElements.forEach(function (element, index) {
      element.addEventListener('click', function () {
        renderBigPicture(bigPictureElement, window.cachePictures[index]);
      });
    });
  }, function () { });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      closeBigPictureClickHandler();
    }
    document.removeEventListener('keydown', closeBigPictureClickHandler);
  });

  closeBigPictureElement.addEventListener('click', closeBigPictureClickHandler);

  document.removeEventListener('click', closeBigPictureClickHandler);

})();

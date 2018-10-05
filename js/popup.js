'use strict';

(function () {
  var GENERATE_AVATAR_MIN = 1;
  var GENERATE_AVATAR_MAX = 6;
  var KEY_CODE_ESC = 27;
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCommentElement = document.querySelector('.social__comment');
  var bigPictureCommentsBlockElement = document.querySelector('.social__comments');
  var closeBigPictureElement = bigPictureElement.querySelector('.big-picture__cancel');
  var commentsLoaderElement = document.querySelector('.comments-loader');
  var socialCommentCountElement = document.querySelector('.social__comment-count');
  var pictureListElements = Array.prototype.slice.call(document.querySelectorAll('.picture'));

  var generateNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var renderBigPictureComments = function (parentElement, dataOfPictures) {
    var commentFragments = document.createDocumentFragment();
    dataOfPictures.comments.forEach(function (comment) {
      var commentElement = bigPictureCommentElement.cloneNode(true);
      commentElement.querySelector('.social__text').textContent = comment;
      commentElement.querySelector('.social__picture').src = 'img/avatar-' + generateNumber(GENERATE_AVATAR_MIN, GENERATE_AVATAR_MAX) + '.svg';
      commentFragments.appendChild(commentElement);
    });
    parentElement.appendChild(commentFragments);
  };

  var renderBigPicture = function (bigPicture, pictureData) {
    bigPictureCommentsBlockElement.innerHTML = '';
    bigPicture.classList.remove('hidden');
    socialCommentCountElement.classList.add('visually-hidden');
    commentsLoaderElement.classList.add('visually-hidden');
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

  pictureListElements.forEach(function (element, index) {
    element.addEventListener('click', function () {
      renderBigPicture(bigPictureElement, window.cachePictures[index]);
    });
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      closeBigPictureClickHandler();
    }
    document.removeEventListener('keydown', closeBigPictureClickHandler);
  });

  closeBigPictureElement.addEventListener('click', closeBigPictureClickHandler);

  document.removeEventListener('click', closeBigPictureClickHandler);

})();

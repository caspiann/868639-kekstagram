'use strict';

(function () {
  var GENERATE_AVATAR_MIN = 1;
  var GENERATE_AVATAR_MAX = 6;
  var KEY_CODE_ESC = 27;
  var FILTER_BUTTON_ATTRIBUTE_NEW = 'filter-new';
  var FILTER_BUTTON_ATTRIBUTE_DISCUSSED = 'filter-discussed';
  var FIRST_COMMENTS_LENGTH = 5;

  var renderPicture = function (template, picture) {
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
    var commentElement;
    bigPictureCommentsBlockElement.innerHTML = '';

    for (var i = 0; i < pictures.comments.length && i < FIRST_COMMENTS_LENGTH; i++) {
      commentElement = commentTemplateElement.cloneNode(true);
      commentElement.querySelector('.social__text').textContent = pictures.comments[i];
      commentElement.querySelector('.social__picture').src = 'img/avatar-' + generateNumber(GENERATE_AVATAR_MIN, GENERATE_AVATAR_MAX) + '.svg';
      parentElement.appendChild(commentElement);
    }
  };

  var renderBigPicture = function (pictureData) {
    bigPictureElement.querySelector('.big-picture__img img').src = pictureData.url;
    bigPictureElement.querySelector('.comments-count').textContent = pictureData.comments.length;
    bigPictureElement.querySelector('.likes-count').textContent = pictureData.likes;
    bigPictureElement.querySelector('.social__picture').src = 'img/avatar-' + generateNumber(GENERATE_AVATAR_MIN, GENERATE_AVATAR_MAX) + '.svg';

    renderBigPictureComments(bigPictureCommentsBlockElement, pictureData);
  };

  var showBigPicture = function () {
    bigPictureElement.classList.remove('hidden');
    document.addEventListener('keydown', documentKeydownHandler);
    closeBigPictureElement.addEventListener('click', closeBigPictureElementClickHandler);
  };

  var hideBigPicture = function () {
    bigPictureElement.classList.add('hidden');
    bigPictureCommentsBlockElement.innerHTML = '';
    document.removeEventListener('keydown', documentKeydownHandler);
    closeBigPictureElement.removeEventListener('click', closeBigPictureElementClickHandler);
  };

  var documentKeydownHandler = function (evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      hideBigPicture();
    }
  };

  var closeBigPictureElementClickHandler = function () {
    hideBigPicture();
  };

  var showPicturesFilterClickHandler = function (button) {
    button.classList.add('img-filters__button--active');
  };

  var hidePicturesFilterClickHandler = function (button) {
    button.classList.remove('img-filters__button--active');
  };

  var renderPictures = function (pictures) {
    pictures.forEach(function (picture) {
      var pictureElement = renderPicture(pictureTemplateElement, picture);
      pictureElement.content.querySelector('a').addEventListener('click', function () {
        renderBigPicture(picture);
        showBigPicture();
      });
      pictureElements.appendChild(pictureElement.content);
    });
    pictureFilterElement.classList.remove('img-filters--inactive');
  };

  var clearActiveFiltersButton = function () {
    picturesFilterButtonElements.forEach(function (buttonElement) {
      hidePicturesFilterClickHandler(buttonElement);
    });
  };

  var clearPictures = function () {
    var renderedPicturesElement = pictureElements.querySelectorAll('.picture');
    renderedPicturesElement.forEach(function (picture) {
      pictureElements.removeChild(picture);
    });
  };

  var filterButtonClickHandler = function (evt) {
    var activeFilterButtonElement = evt.target;

    clearActiveFiltersButton();
    showPicturesFilterClickHandler(activeFilterButtonElement);
    clearPictures();

    switch (activeFilterButtonElement.getAttribute('id')) {
      case FILTER_BUTTON_ATTRIBUTE_NEW: return renderPictures(window.picturesFilter.getNewPictures(window.cachePictures));
      case FILTER_BUTTON_ATTRIBUTE_DISCUSSED: return renderPictures(window.picturesFilter.getMostDiscussedElements(window.cachePictures));
      default: return renderPictures(window.cachePictures);
    }
  };

  var onLoad = function (responseServerData) {
    window.cachePictures = responseServerData;
    renderPictures(window.cachePictures);

    picturesFilterButtonElements.forEach(function (buttonElement) {
      buttonElement.addEventListener('click', window.debounce(filterButtonClickHandler));
    });
  };

  var onError = function (message) {
    window.messages.createErrorLoad(message);
  };

  var pictureTemplateElement = document.querySelector('#picture');
  var pictureElements = document.querySelector('.pictures');
  var bigPictureElement = document.querySelector('.big-picture');
  var commentTemplateElement = document.querySelector('.social__comment').cloneNode(true);
  var bigPictureCommentsBlockElement = document.querySelector('.social__comments');
  var closeBigPictureElement = bigPictureElement.querySelector('.big-picture__cancel');
  var pictureFilterElement = document.querySelector('.img-filters');
  var picturesFilterButtonElements = pictureFilterElement.querySelectorAll('.img-filters__button');

  window.backend.getData(onLoad, onError);
})();

'use strict';

(function () {
  var GENERATE_AVATAR_MIN = 1;
  var GENERATE_AVATAR_MAX = 6;
  var COMMENTS_PER_PAGE = 5;
  var KEY_CODE_ESC = 27;
  var FILTER_NEW = 'new';
  var FILTER_DISCUSSED = 'discussed';
  var MODAL_BODY_STYLE = 'modal-open';
  var AVATAR_FORMAT = '.svg';
  var AVATAR_NAME = 'img/avatar-';

  var bodyElement = document.querySelector('body');
  var bigPictureCommentsLoaderElement = document.querySelector('.social__comments-loader');
  var bigPictureCommentsCountElement = document.querySelector('.social__comment-count');

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

  var createCommentElement = function (comment) {
    var commentElement = commentTemplateElement.cloneNode(true);
    commentElement.querySelector('.social__text').textContent = comment;
    commentElement.querySelector('.social__picture').src = AVATAR_NAME + generateNumber(GENERATE_AVATAR_MIN, GENERATE_AVATAR_MAX) + AVATAR_FORMAT;

    return commentElement;
  };

  var createCommentCounterElement = function (currentCommentsNumber, totalCommentsNumber) {
    var counterElement = document.createElement('span');
    counterElement.className = 'comments-count';
    counterElement.textContent = totalCommentsNumber;
    return currentCommentsNumber + ' из ' + counterElement.innerHTML + ' комментариев';
  };

  var renderBigPicture = function (pictureData) {
    bigPictureElement.querySelector('.big-picture__img img').src = pictureData.url;
    bigPictureElement.querySelector('.likes-count').textContent = pictureData.likes;
    bigPictureElement.querySelector('.social__picture').src = AVATAR_NAME + generateNumber(GENERATE_AVATAR_MIN, GENERATE_AVATAR_MAX) + AVATAR_FORMAT;
    var totalCommentsNumber = pictureData.comments.length;
    var currentCommentsNumber = 0;
    var bigPictureCommentsLoaderElementClickHandler = function () {
      loadMoreComments();
    };

    var loadMoreComments = function () {
      var commentElement;
      var commentsNumber = Math.min(COMMENTS_PER_PAGE, totalCommentsNumber - currentCommentsNumber);

      for (var i = 0; i < commentsNumber; i++) {
        commentElement = createCommentElement(pictureData.comments[i]);
        bigPictureCommentsBlockElement.appendChild(commentElement);
      }
      currentCommentsNumber += i;

      bigPictureCommentsCountElement.innerHTML = '';
      bigPictureCommentsCountElement.textContent = createCommentCounterElement(currentCommentsNumber, totalCommentsNumber);

      if (currentCommentsNumber >= totalCommentsNumber) {
        bigPictureCommentsLoaderElement.removeEventListener('click', bigPictureCommentsLoaderElementClickHandler);
        bigPictureCommentsLoaderElement.classList.add('hidden');
      }

    };

    bigPictureCommentsBlockElement.innerHTML = '';
    bigPictureCommentsLoaderElement.addEventListener('click', bigPictureCommentsLoaderElementClickHandler);
    bigPictureCommentsLoaderElement.classList.remove('hidden');

    loadMoreComments();
  };

  var showBigPicture = function () {
    bodyElement.classList.add(MODAL_BODY_STYLE);
    bigPictureElement.classList.remove('hidden');
    bigPictureElement.tabIndex = 0;
    bigPictureElement.focus();
    document.addEventListener('keydown', documentKeydownHandler);
    closeBigPictureElement.addEventListener('click', closeBigPictureElementClickHandler);
  };

  var hideBigPicture = function () {
    bodyElement.classList.remove(MODAL_BODY_STYLE);
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
    var renderedPictureElements = pictureElements.querySelectorAll('.picture');
    renderedPictureElements.forEach(function (picture) {
      pictureElements.removeChild(picture);
    });
  };

  var filterButtonClickHandler = function (evt) {
    var activeFilterButtonElement = evt.target;

    clearActiveFiltersButton();
    showPicturesFilterClickHandler(activeFilterButtonElement);
    clearPictures();

    var filterAttributeId = activeFilterButtonElement.getAttribute('id');
    var filterName = filterAttributeId.split('-')[1];

    switch (filterName) {
      case FILTER_NEW:
        return renderPictures(window.picturesFilter.filterNewPictures(cachedPictures));
      case FILTER_DISCUSSED:
        return renderPictures(window.picturesFilter.filterMostDiscussed(cachedPictures));
      default:
        return renderPictures(cachedPictures);
    }
  };

  var onLoad = function (pictures) {
    cachedPictures = pictures.slice();
    renderPictures(cachedPictures);
    picturesFilterButtonElements.forEach(function (buttonElement) {
      buttonElement.addEventListener('click', window.debounce(filterButtonClickHandler));
    });
  };

  var onError = function (message) {
    window.messages.createErrorLoad(message);
  };

  var cachedPictures = [];
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

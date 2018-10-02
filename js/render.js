'use strict';

(function () {
  var bigPictureCommentElement = document.querySelector('.social__comment');

  window.render = {
    picturesData: window.data.generatePicturesData(window.variables.PHOTOS_NUMBER),

    renderPhoto: function (pictureTemplateElement, pictureData) {
      var pictureElement = pictureTemplateElement.cloneNode(true);
      pictureElement.content.querySelector('.picture__img').src = pictureData.url;
      pictureElement.content.querySelector('.picture__comments').textContent =
        pictureData.comments.length;
      pictureElement.content.querySelector('.picture__likes').textContent =
        pictureData.likes;
      return pictureElement;
    },
    renderPhotos: function (
        parentElement,
        pictureTemplateElement,
        picturesData
    ) {
      var photosFragment = document.createDocumentFragment();
      picturesData.forEach(function (pictureData, index) {
        photosFragment.appendChild(
            window.render.renderPhoto(pictureTemplateElement, picturesData[index]).content
        );
      });
      parentElement.appendChild(photosFragment);
    },
    renderBigPictureComments: function (parentElement, picturesData) {
      var commentFragments = document.createDocumentFragment();

      picturesData.comments.forEach(function (comment) {
        var commentElement = bigPictureCommentElement.cloneNode(true);
        commentElement.querySelector('.social__text').textContent = comment;
        commentElement.querySelector('.social__picture').src =
          'img/avatar-' +
          window.data.generateNumber(window.variables.GENERATE_AVATAR_MIN, window.variables.GENERATE_AVATAR_MAX) +
          '.svg';
        commentFragments.appendChild(commentElement);
      });
      parentElement.appendChild(commentFragments);
    },
    renderBigPicture: function (bigPictureElement, pictureData) {
      bigPictureElement.classList.remove('hidden');
      window.domElements.socialCommentCountElement.classList.add('visually-hidden');
      window.domElements.commentsLoaderElement.classList.add('visually-hidden');
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
        window.data.generateNumber(window.variables.GENERATE_AVATAR_MIN, window.variables.GENERATE_AVATAR_MAX) +
        '.svg';
      window.render.renderBigPictureComments(window.domElements.bigPictureCommentsBlockElement, pictureData);
    }
  };
})();

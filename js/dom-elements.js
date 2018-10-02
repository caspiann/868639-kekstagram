'use strict';

(function () {
  window.domElements = {
    bigPictureCommentElement: document.querySelector('.social__comment'),

    inputHashtagsElement: document.querySelector('.text__hashtags'),
    inputCommentsElement: document.querySelector('.text__description'),
    pictureTemplateElement: document.querySelector('#picture'),
    pictureElements: document.querySelector('.pictures'),
    bigPictureElement: document.querySelector('.big-picture'),
    closeBigPictureElement: document.querySelector('.big-picture__cancel'),
    uploadPictureElement: document.querySelector('#upload-file'),
    uploadPictureOverlayElement: document.querySelector('.img-upload__overlay'),
    closeEditPictureFormElement: document.querySelector('.img-upload__cancel'),
    imagePreviewElement: document.querySelector('.img-upload__preview img'),
    effectLevelElement: document.querySelector('.effect-level'),
    effectLevelLineElement: document.querySelector('.effect-level__line'),
    effectLevelDepthElement: document.querySelector('.effect-level__depth'),
    effectLevelPinElement: document.querySelector('.effect-level__pin'),
    effectValueElement: document.querySelector('.effect-level__value'),
    socialCommentCountElement: document.querySelector('.social__comment-count'),
    commentsLoaderElement: document.querySelector('.comments-loader'),
    bigPictureCommentsBlockElement: document.querySelector('.social__comments')
  };
})();



'use strict';

(function () {
  var KEY_CODE_ESC = 27;
  var PHOTOS_NUMBER = 25;
  var EFFECT_DEFAULT_VALUE = 100;
  var effectElements = Array.prototype.slice.call(document.querySelectorAll('.effects__item'));
  var picturesData = window.generatedData.generatePicturesData(PHOTOS_NUMBER);

  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCommentsBlockElement = document.querySelector('.social__comments');
  var uploadPictureElement = document.querySelector('#upload-file');
  var uploadPictureOverlayElement = document.querySelector('.img-upload__overlay');
  var effectLevelLineElement = document.querySelector('.effect-level__line');
  var imagePreviewElement = document.querySelector('.img-upload__preview img');
  var effectLevelDepthElement = document.querySelector('.effect-level__depth');
  var effectLevelPinElement = document.querySelector('.effect-level__pin');
  var effectLevelElement = document.querySelector('.effect-level');
  var closeBigPictureElement = bigPictureElement.querySelector('.big-picture__cancel');
  var inputCommentsElement = document.querySelector('.text__description');
  var closeEditPictureFormElement = uploadPictureOverlayElement.querySelector('.img-upload__cancel');
  var inputHashtagsElement = document.querySelector('.text__hashtags');
  var pictureListElements = document.querySelectorAll('.picture');

  var closeBigPictureClickHandler = function () {
    bigPictureElement.classList.add('hidden');
    bigPictureCommentsBlockElement.innerHTML = '';
  };

  var closeEditingFormKeydownHandler = function () {
    uploadPictureElement.value = '';
    uploadPictureOverlayElement.classList.add('hidden');
  };

  var effectClickHandler = function (effect) {
    var target = effect.querySelector('input');
    var effectName = target.value;
    var effectPercent = effectLevelLineElement.offsetWidth + 'px';

    imagePreviewElement.style.filter = window.filterStyle.createPreviewFilterStyle(EFFECT_DEFAULT_VALUE); //
    imagePreviewElement.classList.remove(imagePreviewElement.classList[0]);
    imagePreviewElement.classList.add('effects__preview--' + effectName);

    effectLevelDepthElement.style.width = effectPercent;
    effectLevelPinElement.style.left = effectPercent;

    if (effectName === 'none') {
      effectLevelElement.classList.add('hidden');
    } else {
      effectLevelElement.classList.remove('hidden');
    }
  };

  var keydownEscPressHandler = function (evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      closeEditingFormKeydownHandler();
    }
  };

  pictureListElements.forEach(function (element, index) {
    element.addEventListener('click', function () {
      window.renderBigPicture.renderBigPicture(bigPictureElement, picturesData[index]);
    });
  });

  closeBigPictureElement.addEventListener('click', closeBigPictureClickHandler);

  document.removeEventListener('click', closeBigPictureClickHandler);

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      closeBigPictureClickHandler();
    }
    document.removeEventListener('keydown', closeBigPictureClickHandler);
  });

  uploadPictureElement.addEventListener('change', function () {
    uploadPictureOverlayElement.classList.remove('hidden');
    effectLevelDepthElement.style.width = effectLevelPinElement.style.left = effectLevelLineElement.offsetWidth + 'px';
    effectLevelElement.classList.add('hidden');
  });

  closeEditPictureFormElement.addEventListener('click', closeEditingFormKeydownHandler);
  document.removeEventListener('click', closeEditingFormKeydownHandler);

  document.addEventListener('keydown', keydownEscPressHandler);
  document.removeEventListener('keydown', keydownEscPressHandler);

  inputHashtagsElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', keydownEscPressHandler);
  });
  inputHashtagsElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', keydownEscPressHandler);
  });
  inputCommentsElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', keydownEscPressHandler);
  });
  inputCommentsElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', keydownEscPressHandler);
  });

  effectElements.forEach(function (effect) {
    effect.addEventListener('click', function () {
      effectClickHandler(effect);
    });
  });

  inputHashtagsElement.addEventListener('change', function () {
    var validation = window.validateTags.validateTags(inputHashtagsElement.value);
    if (validation.isValid) {
      inputHashtagsElement.setCustomValidity(validation.firstError);
    } else {
      inputHashtagsElement.setCustomValidity('');
    }
  });
})();

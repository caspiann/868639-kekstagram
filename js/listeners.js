'use strict';

(function () {
  var picturesData = window.data.generatePicturesData(window.variables.PHOTOS_NUMBER);
  var pictureListElements = document.querySelectorAll('.picture');

  pictureListElements.forEach(function (element, index) {
    element.addEventListener('click', function () {
      window.render.renderBigPicture(window.domElements.bigPictureElement, picturesData[index]);
    });
  });

  window.domElements.closeBigPictureElement.addEventListener('click', window.handlers.closeBigPictureClickHandler);
  document.removeEventListener('click', window.handlers.closeBigPictureClickHandler);

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.variables.KEY_CODE_ESC) {
      window.handlers.closeBigPictureClickHandler();
    }
    document.removeEventListener('keydown', window.handlers.closeBigPictureClickHandler());
  });

  window.domElements.uploadPictureElement.addEventListener('change', function () {
    window.domElements.uploadPictureOverlayElement.classList.remove('hidden');
    window.domElements.effectLevelDepthElement.style.width = window.domElements.effectLevelPinElement.style.left = window.domElements.effectLevelLineElement.offsetWidth + 'px';
    window.domElements.effectLevelElement.classList.add('hidden');
  });

  window.domElements.closeEditPictureFormElement.addEventListener('click', window.handlers.closeEditingFormKeydownHandler);
  document.removeEventListener('click', window.handlers.closeEditingFormKeydownHandler);

  document.addEventListener('keydown', window.handlers.keydownEscPressHandler);
  document.removeEventListener('keydown', window.handlers.keydownEscPressHandler);

  window.domElements.inputHashtagsElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', window.handlers.keydownEscPressHandler);
  });
  window.domElements.inputHashtagsElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', window.handlers.keydownEscPressHandler);
  });
  window.domElements.inputCommentsElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', window.handlers.keydownEscPressHandler);
  });
  window.domElements.inputCommentsElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', window.handlers.keydownEscPressHandler);
  });

  window.variables.effectElements.forEach(function (effect) {
    effect.addEventListener('click', function () {
      window.handlers.effectClickHandler(effect);
    });
  });

  window.domElements.inputHashtagsElement.addEventListener('change', function () {
    var validation = window.validate.validateTags(window.domElements.inputHashtagsElement.value);
    if (validation.isValid) {
      window.domElements.inputHashtagsElement.setCustomValidity(validation.firstError);
    } else {
      window.domElements.inputHashtagsElement.setCustomValidity('');
    }
  });
})();

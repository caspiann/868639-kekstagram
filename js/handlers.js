'use strict';

(function () {

  window.handlers = {
    closeBigPictureClickHandler: function () {
      window.domElements.bigPictureElement.classList.add('hidden');
      window.domElements.bigPictureCommentsBlockElement.innerHTML = '';
    },

    closeEditingFormKeydownHandler: function () {
      window.domElements.uploadPictureElement.value = '';
      window.domElements.uploadPictureOverlayElement.classList.add('hidden');
    },

    effectClickHandler: function (effect) {
      var target = effect.querySelector('input');
      var effectName = target.value;
      var effectPercent = window.domElements.effectLevelLineElement.offsetWidth + 'px';

      window.domElements.imagePreviewElement.style.filter = window.filterStyle.createPreviewFilterStyle(window.variables.EFFECT_DEFAULT_VALUE);
      window.domElements.imagePreviewElement.classList.remove(window.domElements.imagePreviewElement.classList[0]);
      window.domElements.imagePreviewElement.classList.add('effects__preview--' + effectName);

      window.domElements.effectLevelDepthElement.style.width = effectPercent;
      window.domElements.effectLevelPinElement.style.left = effectPercent;

      if (effectName === 'none') {
        window.domElements.effectLevelElement.classList.add('hidden');
      } else {
        window.domElements.effectLevelElement.classList.remove('hidden');
      }
    },

    keydownEscPressHandler: function (evt) {
      if (evt.keyCode === window.variables.KEY_CODE_ESC) {
        window.handlers.closeEditingFormKeydownHandler();
      }
    }
  };
})();
